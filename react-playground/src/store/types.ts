
// TodoList组件相关类型定义
import { UseBoundStore, StoreApi } from 'zustand';

// 定义API对象的类型，所有值必须是函数类型
export type ApiObject = {
  [key: string]: (...args: any[]) => any;
};

// 定义TodoItem接口，表示单个todo项
export interface TodoItem {
  content: string;
}

// 定义TodoListData接口，表示todoList的数据结构
export interface TodoListData {
  todos: Map<string, TodoItem>;
}

// 定义初始状态接口，data和viewStatus都是可选的
export interface InitState<TData = any, TViewStatus = any> {
  data?: TData;
  viewStatus?: TViewStatus;
}

// 定义store状态的接口，使用泛型参数
export interface StoreState<TData = any, TViewStatus = any, TApi extends ApiObject = ApiObject> {
  // data字段，类型为泛型参数
  data: TData;
  
  // viewStatus字段，类型为泛型参数
  viewStatus: TViewStatus;
  
  // api字段，必须是ApiObject类型的泛型
  api: TApi;
}

// 定义apiEnhancer函数类型
export type ApiEnhancer<TApi extends ApiObject = ApiObject, TEnhancedApi extends ApiObject = TApi> = (
  api: TApi
) => TEnhancedApi;


// 定义initStore函数类型
export type InitStoreFunction<TData = any, TViewStatus = any, TApi extends ApiObject = ApiObject, TEnhancedApi extends ApiObject = TApi> = (
  initState?: InitState<TData, TViewStatus>,
  apiEnhancer?: ApiEnhancer<TApi, TEnhancedApi>
) => UseBoundStore<StoreApi<StoreState<TData, TViewStatus, TApi>>>;

// 定义createStore函数返回的结果接口
export interface CreateStoreResult<TApi extends ApiObject = ApiObject, TData = any, TViewStatus = any> {
  initStore: InitStoreFunction<TData, TViewStatus, TApi>;
  useStore: () => UseBoundStore<StoreApi<StoreState<TData, TViewStatus, TApi>>>
}

// 定义createStore函数的参数接口
export interface CreateStoreParams<TData = any, TViewStatus = any, TApi extends ApiObject = ApiObject> {
  data: TData;
  viewStatus: TViewStatus;
  api?: TApi;
}

// 定义createStore函数类型
export type CreateStoreFunction<TData = any, TViewStatus = any, TApi extends ApiObject = ApiObject> = (
  params: CreateStoreParams<TData, TViewStatus, TApi>
) => CreateStoreResult<TApi, TData, TViewStatus>;
