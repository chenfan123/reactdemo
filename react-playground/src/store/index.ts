import { create as createZustandStore } from 'zustand';
import type {
  ApiEnhancer,
  ApiObject,
  CreateStoreParams,
  CreateStoreResult,
  InitStoreFunction,
  InitState,
  StoreState,
} from './types';

// 深度合并函数，确保返回新对象
function deepMerge<T>(target: T, source: Partial<T>): T {
  // 如果target不是对象，直接返回target的拷贝
  if (typeof target !== 'object' || target === null) {
    return Array.isArray(target) 
      ? [...target] as unknown as T
      : JSON.parse(JSON.stringify(target));
  }
  
  // 如果source不存在，直接返回target的深拷贝
  if (!source || typeof source !== 'object') {
    return Array.isArray(target) 
      ? [...target] as unknown as T
      : JSON.parse(JSON.stringify(target));
  }
  
  // 处理数组
  if (Array.isArray(target)) {
    return [...target] as unknown as T;
  }
  
  // 处理对象
  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    const targetValue = (target as any)[key];
    const sourceValue = (source as any)[key];
    
    // 如果都是对象且不是null，则递归合并
    if (typeof targetValue === 'object' && targetValue !== null && 
        typeof sourceValue === 'object' && sourceValue !== null &&
        !Array.isArray(targetValue) && !Array.isArray(sourceValue)) {
      (result as any)[key] = deepMerge(targetValue, sourceValue);
    } 
    // 否则直接替换，但确保创建新对象
    else if (sourceValue !== undefined) {
      (result as any)[key] = Array.isArray(sourceValue) 
        ? [...sourceValue] 
        : typeof sourceValue === 'object' && sourceValue !== null 
          ? { ...sourceValue } 
          : sourceValue;
    }
  });
  
  return result;
}

// 实现createStore函数，接收包含data、viewStatus和api的参数
export const createStore = <TData = any, TViewStatus = any, TApi extends ApiObject = ApiObject>(
  params: CreateStoreParams<TData, TViewStatus, TApi>
): CreateStoreResult<TApi, TData, TViewStatus> => {
  // 在闭包内部创建store指针，但不立即初始化
  let store: any;
  const initialParams = params;
  
  // 定义initStore函数，所有参数都设为可选
  const initStore: InitStoreFunction<TData, TViewStatus, TApi> = (initState?: InitState<TData, TViewStatus>, apiEnhancer?: ApiEnhancer<TApi>) => {
    // 只有在store为空时才初始化
    if (store) {
      return;
    }
    if (!store) {
      // 合并createStore传入的参数和initStore传入的initState
      // 如果initState为undefined或缺少data/viewStatus，则使用合适的默认值
      const safeInitState = initState || { data: {} as TData, viewStatus: {} as TViewStatus };
      
      // 深度合并data和viewStatus，确保创建新对象
      const mergedData = safeInitState.data !== undefined 
        ? deepMerge<TData>(initialParams.data, safeInitState.data as Partial<TData>) 
        : Array.isArray(initialParams.data) 
          ? [...initialParams.data] as TData
          : (typeof initialParams.data === 'object' && initialParams.data !== null
              ? { ...initialParams.data }
              : JSON.parse(JSON.stringify(initialParams.data)));
      
      const mergedViewStatus = safeInitState.viewStatus !== undefined 
        ? deepMerge<TViewStatus>(initialParams.viewStatus, safeInitState.viewStatus as Partial<TViewStatus>) 
        : Array.isArray(initialParams.viewStatus)
          ? [...initialParams.viewStatus] as TViewStatus
          : (typeof initialParams.viewStatus === 'object' && initialParams.viewStatus !== null
              ? { ...initialParams.viewStatus }
              : JSON.parse(JSON.stringify(initialParams.viewStatus)));

      
      const mergedState = {
        data: mergedData,
        viewStatus: mergedViewStatus,
        api: initialParams.api
      };
      
      // 创建store实例
      // @ts-ignore
      store = createZustandStore<StoreState<TData, TViewStatus, TApi>>(() => mergedState);
    }
    
    // 如果提供了apiEnhancer，则使用它增强api
    const currentApi = store.getState().api as TApi;
    const enhancedApi = apiEnhancer ? apiEnhancer(currentApi) : currentApi;
    
    // 更新store状态，使用initState提供的值或初始默认值，并进行深度合并
    const safeInitStateForUpdate = initState || { data: {} as TData, viewStatus: {} as TViewStatus };
    
    // 深度合并data
      const updatedData = safeInitStateForUpdate.data !== undefined 
        ? deepMerge<TData>(initialParams.data, safeInitStateForUpdate.data as Partial<TData>) 
        : Array.isArray(initialParams.data)
          ? [...initialParams.data] as TData
          : (typeof initialParams.data === 'object' && initialParams.data !== null
              ? { ...initialParams.data }
              : JSON.parse(JSON.stringify(initialParams.data)));
      
      // 深度合并viewStatus
      const updatedViewStatus = safeInitStateForUpdate.viewStatus !== undefined 
        ? deepMerge<TViewStatus>(initialParams.viewStatus, safeInitStateForUpdate.viewStatus as Partial<TViewStatus>) 
        : Array.isArray(initialParams.viewStatus)
          ? [...initialParams.viewStatus] as TViewStatus
          : (typeof initialParams.viewStatus === 'object' && initialParams.viewStatus !== null
              ? { ...initialParams.viewStatus }
              : JSON.parse(JSON.stringify(initialParams.viewStatus)));
    
    // 创建新的api对象
    const newApi = { ...enhancedApi };
    
    // 设置新状态，确保所有属性都是新对象
    store.setState({
      data: updatedData,
      viewStatus: updatedViewStatus,
      api: newApi
    });
    
    // 返回store本身，这样就符合StoreReturn类型的要求
    return store;
  };
  
  // 返回包含initStore和useStore方法的对象
  return {
    initStore: initStore,
    useStore: () => {
      if (!store) {
        throw new Error('Store has not been initialized. Call initStore first.');
      }
      // 返回正确类型的store
      return store as typeof store;
    }
  };
};
