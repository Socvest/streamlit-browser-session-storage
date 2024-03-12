# Streamlit sessionBrowser storage

This repo is to help streamlt users manage data in a browser's sessionBrowser storage.
Built on the `use-session-storage-state` that allows for real time updates especially important when sessionBrowser storage item is deleted.

for more details:
`https://www.npmjs.com/package/use-session-storage-state`


```
pip install streamlit-browser-session-storage
```


```
from streamlit_session_browser_storage import SessionStorage
sessionBrowserS = SessionStorage()
```

### store items to sessionBrowser storage

```
itemKey = "camera"
itemValue = "Tarah"
sessionBrowserS.setItem(itemKey, itemValue)
```

### get item from sessionBrowser storage

```
itemKey = "Taylor Swift"
sessionBrowser_storage_item = sessionBrowserS.getItem(itemKey)

```

### get all items saved on sessionBrowser storage

```
saved_individual = sessionBrowserS.getAll()
st.write(saved_individual)

```

### delete all
```
sessionBrowserS.deleteAll()

```

### when getting sessionBrowser storage items with streamlit widgets
```
st.subheader("Method 1")

def sessionBrowserStorageManager():
    return SessionStorage()
sessionBrowserS = sessionBrowserStorageManager()

if "get_val" not in st.session_state:
    st.session_state["get_val"] = None

with st.form("get_data"):
    st.text_input("key", key="get_sessionBrowser_storage_v")
    st.form_submit_button("Submit") 

if st.session_state["get_sessionBrowser_storage_v"] != "":
    val_ = sessionBrowserS.getItem(st.session_state["get_sessionBrowser_storage_v"], key="test_get_item")
    st.session_state["get_val"] = val_
st.write(st.session_state["get_val"])

### When using callbacks for get item, can use the below example. But it wont reveal data unless app has rendered twice. But callback can be work without a hitch generally (based on my tests).

st.subheader("Method 2 - using callback. Does not load instantly especially for get storage")

def sessionBrowserStorageManager():
    return SessionStorage()
sessionBrowserS = sessionBrowserStorageManager()

if "get_val_2" not in st.session_state:
    st.session_state["get_val_2"] = None

if "st_col_test" not in st.session_state:
    st.session_state["st_col_test"] = None 

def change_state_2():

    with st.session_state["st_col_test"][0]: # call method from below form
        sessionBrowserS.getItem(st.session_state["get_sessionBrowser_storage_v_2"], key="test_get_item_2") # initialise/run method and value will be stored in `session_state`
    

with st.form("get_data_2"):
    st.text_input("key", key="get_sessionBrowser_storage_v_2")
    st.form_submit_button("Submit", on_click=change_state_2)
st.session_state["st_col_test"] = st.columns(1) #to make sure rendering happens below form (or other streamlit element. Else the re-rendering of component upon re-running of up will be run at the top of the streamlit component (form here) which creates nasty ui experience.)


if "test_get_item_2" in st.session_state and st.session_state["test_get_item_2"] != None:
    st.session_state["get_val_2"] = st.session_state["test_get_item_2"] # if sessionBrowser storage method is initialised, get the stored value and use it throughout the app.
st.write(st.session_state["get_val_2"])


```
