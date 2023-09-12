# EasyCall Package

EasyCall offers a streamlined approach to making API calls in React applications. It wraps your components with a context provider, offering hooks and utilities for managing HTTP requests seamlessly.

## Installation

```bash
npm install easycall --save
```

## Features

- Concise API for managing HTTP requests.
- Global and component-level interceptors for requests and responses.
- Support for multiple API endpoints with diverse methods.
- Context-based state management for API results.

## Getting Started

### Sample Config

Easily define multiple endpoints and associated methods:

```tsx
import "./index.css"
import App from "./App.tsx"
import ReactDOM from "react-dom/client"
import { CallerProvider } from "easycall"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CallerProvider
    easyCallConfig={{
      baseURL: "https://jsonplaceholder.typicode.com/",
      apiRoutes: [
        {
          key: "todos",
          method: "get",
          endpoint: "todos",
        },
        {
          key: "todo",
          method: "get",
          endpoint: "todo/:id",
        },
      ],
    }}
  >
    <App />
  </CallerProvider>,
)
```

### Usage Sample

Utilize the `useEasyCall` hook within your components:

```tsx
// Test.component.tsx

function Test() {
  const { call, data, error, loading } = useCaller((caller) => caller?.todos?.get?.(), {
    onBeforeRequest(requestConfig) {
      // Modify or log request config at component level
      return requestConfig
    },
  })

  return loading ? (
    <Loading />
  ) : (
    <>
      {error && <Alert message={error} />}
      {data && <DataDisplayer data={data} />}
    </>
  )
}
```

### Low-Level Approach

For projects or sections where you'd prefer not to use the context-based approach:

```tsx
const apiRoutes = [
    {
        endpoint: "/todo",
        methods: ["Get", "Post"]
    }
];

const caller = createCaller(apiRoutes);
export caller;
```

> [!IMPORTANT]
> In the low-level approach, the custom hook `useEasyCall` is not available. Consider creating your custom hook or use the provided utilities.

> [!NOTE]
> The caller store is dependent on the context provided by `<EasyCallRoot />`. When using the low-level approach, this store won't be accessible.

## Roadmap

- Integration with popular state management libraries.
- Advanced caching mechanisms.
- More granular control over request lifecycles.

## Contributing

We value contributions and suggestions from the community. Whether it's a bug fix, a new feature, or a typo, we appreciate the time you take to improve EasyCall.

- **Bug Reports**: Open an issue for any bugs or issues you encounter.
- **Feature Requests**: New ideas and suggestions are always welcome.
- **Development**: Create a pull request with new features or fixes.

> [!NOTE]
> The `onBeforeRequest` and `onAfterResponse` hooks at the component level are still under development.
