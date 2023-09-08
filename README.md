# EasyCall package

## Config Sample

```tsx
    const Url1 = "google.com"
    const Url2 = "bing.com"
    <EasyCallRoot config={{
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
  {caller, error, loading} = useEasyCall(
    {
        onBeforeRequest(requestConfig){
            // do something before request at component level
            return requestConfig;
        }
    })

  const [todo, setTodo] = useState();
  useEffect(() => {
    caller.todo1.get().then(res => res.save())
    caller.todo2.get().then(res => setTodo(res.data))
  }, [])

  return loading ?
        <Loading /> :
        <>
            {error ?? <Alert message={error} />
            {data ?? <DataDisplayer data={caller.todo.get.data} />}
        </>
}
```
