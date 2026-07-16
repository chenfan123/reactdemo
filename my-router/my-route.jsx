import { createContext, useState, useContext } from 'react';

export const RouteContext = createContext(null);

export function BrowserRouter({ children }) {
  // 1. 初始化currentPath
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // 2. 监听popstate事件
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 3. navigate函数
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <RouteContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouteContext.Provider>
  );
}

// <Route path="/home" element={Home} />
export function Routes({ path, element }) {
  const { currentPath } = useContext(RouteContext);
  return currentPath === path ? element : null;
}

// Routes 组件
export function Routes({ children }) {
  const { currentPath } = useContext(RouteContext);
  let matchElement = null;
  children.forEach((child) => {
    if (child.props.path === currentPath) {
      matchElement = child;
    }
  });
  return matchElement;
}

export function Link({ to, children }) {
  const { navigate } = useContext(RouteContext);
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouteContext);
  return navigate;
}

export function useLocation() {
  const { currentPath } = useContext(RouteContext);
  return currentPath;
}
