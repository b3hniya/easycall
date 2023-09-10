# EasyCall package

## Sample Config

```tsx
    const Url1 = "google.com"
    const Url2 = "bing.com"
    <EasyCallRoot config={{
        // You can go with baseURL as well...
        apiEndpoints: [
            {
            endpoint: `${Url1}/todos`,
            methods: ["Get", "Post"],
            key: "todo1"
            },
            {
            endpoint: `${Url2}/todos`,
            methods: ["Get", "Post"],
            key: "todo2"
            }
        ],
        onBeforeRequest(requestConfig) {
            // do something before request at global level
            return requestConfig
        },
        onAfterResponse(responseData) {
            // do something after response at global level
            return responseData
        }
    }}>
        <App />
    </EasyCallRoot>
```

## Usage Sample

```tsx
//Test.component.tsx

function Test(){
  {call, data, error, loading} = useEasyCall(callers => callers.todos.get(),
    {
        onBeforeRequest(requestConfig){
            // do something before request at component level
            return requestConfig;
        }
    })
    
  return loading ?
        <Loading /> :
        <>
            {error ?? <Alert message={error} />
            {data ?? <DataDisplayer data={caller.todo.get.data} />}
        </>
}
```

## Low level approach

If you don't want to wrap your application like above you can go as below.

```ts
const apiRoutes = [
  {
     endpoint: "/todo",
     methods: ["Get", "Post"]
  }
]

const caller = createCaller(apiRoutes);
export caller;
```

> [!IMPORTANT]
> Using this approach you will not be able to use the custom hook, instead you can implement your own hook.

> [!NOTE]
> Note that with above approach you cannot store results inside the caller store, caller store is dependant on context which is included inside `<EasyCallRoot />`.
