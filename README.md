# **Easycall**: Effortless API Integration in React

Easycall is your go-to solution for managing API interactions in React applications. It's designed from the ground up to ensure that every API call is streamlined, efficient, and intuitive. With Easycall, state management becomes second nature, and API calls feel like an integral part of your component tree.

## **🚀 Quick Start**

### **Installation**

Initiate your Easycall experience with a simple installation:

```bash
npm install easycall --save
```

## **🌟 Core Features**

- **Simplified API Management**: Navigate through your HTTP requests with unparalleled clarity and ease.
- **Dynamic Interceptors**: Apply interceptors both globally or at the component level, refining each request and response to perfection.
- **Flexible Endpoints**: Create a range of API endpoints effortlessly, each equipped with its specific methods.
- **State Management Reinvented**: Enjoy the upcoming benefits of context-centric state management, where every API outcome has a dedicated space. (Coming Soon)

## **🔧 Setup Guide**

### **Endpoint Configuration**

Set the stage by configuring endpoints and methods tailored to your application's requirements:

```tsx
import { CallerProvider } from "easycall"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CallerProvider
    easycallConfig={{
      baseURL: "https://jsonplaceholder.typicode.com/",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      apiRoutes: [
        {
          key: "todos",
          method: "get",
          endpoint: "todos",
        },
        {
          key: "todo",
          method: "get",
          endpoint: "todos/{0}",
        },
      ],

      onBeforeRequest: (config) => {
        const token = localStorage.getItem("token")
        config.headers = token
          ? {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            }
          : config.headers

        return config
      },

      onAfterResponse: (response) => {
        console.log("onAfterResponse", response)
        return response
      },
    }}
  >
    <App />
  </CallerProvider>,
)
```

## **🛠 Patterns of Usage**

### **Unleash the Power of the Caller Hook**

Harness the `useCaller` hook to make your API interactions intuitive while enabling precise argument passing and query string manipulations:

#### **Fundamental Usage**:

```tsx
import { useCaller } from "easycall"

function SampleComponent() {
  const { call, data, error, loading } = useCaller((caller) => caller?.todos?.get?.())

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {error && <ErrorAlert message={error.message} />}
      {data && <DataViewer data={data} />}
    </>
  )
}
```

#### **Advanced Engagement with Arguments and Query Strings**:

Envision fetching a specific `todo` item using an identifier like `id`. Easycall makes this easy by dynamically replacing endpoint placeholders:

```tsx
import { useCaller } from "easycall"

export const DetailedComponent = () => {
  const { call, data, error, loading } = useCaller((caller) =>
    caller.todo.get({
      args: ["id"],
      queryString: "?numberOfItems=10",
    }),
  )

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {error && <ErrorAlert message={error.message} />}
      {data && <DataViewer data={data} />}
    </>
  )
}
```

#### **Stay Updated with Reactivity**:

Easycall's `useCaller` hook is brilliantly reactive. It re-invokes the API call whenever a dependency changes, guaranteeing that your components are always in sync with the freshest data:

```tsx
import { useState } from "react"
import { useCaller } from "easycall"

function DynamicComponent() {
  const [toggle, setToggle] = useState(false)

  const { call, data, error, loading } = useCaller((caller) => caller?.todos?.get?.(), {
    dependencies: [toggle],
  })

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {error && <ErrorAlert message={error.message} />}
      {data && <DataViewer data={data} />}
      <button onClick={() => setToggle((prev) => !prev)}>Toggle Status</button>
    </>
  )
}
```

### **The Granular Approach**

For enthusiasts who prefer an intricate touch, delve into a detailed strategy:

```tsx
const apiRoutes: ApiRoute[] = [{ endpoint: "/todo", methods: ["Get", "Post"] }];

const callerInstance = createCaller(apiRoutes);
export callerInstance;
```

> **Note**: Opting for this method means you forgo the luxuries of the `useCaller` hook and the context store provided by `<CallerProvider />`.

## **🔮 Upcoming Enhancements**

- Robust error management for a smoother UX.
- Advanced caching strategies to accelerate response times.
- Comprehensive oversight on request lifecycles.

Stay connected for future updates!

## **🤝 Join the Easycall Movement**

Easycall thrives on community insights. Whether it's identifying bugs, brainstorming features, or enhancing the codebase, your input is invaluable:

- **Report Bugs**: Discover an inconsistency? Report [here](https://github.com/b3hniya/easycall/issues).
- **Suggest Features**: Conceived an innovation? Share [here](https://github.com/b3hniya/easycall/issues).
- **Contribute Code**: Modify the repo, submit your enhancements, and create a pull request.
