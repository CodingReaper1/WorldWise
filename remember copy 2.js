// cmds to get ready: npm i, npm i eslint vite-plugin-eslint eslint-config-react-app ---save-dev,npm i react-router-dom@6,npm i json-server

import { NavLink, Route } from "react-router-dom";


// if component instance(element) is changed, deleted, switched it resets state as well as its child components states, also if position is changed in tree

// virtual dom is created by changed state or rendering whole website at start, and it is saved and when new change happens fiber will check differences between two trees one that was before and virtual dom and gives it to reactDOM which then updates dom and then ui is painted on web. react doesnt touch dom itself.

// Use key prop to reset state

// updating state in react is asynchronous, meaning in function if there is state update 3 times it will only update state after reading whole function which is called batching

// render does not actually render components but calling component itself

// state does not change immedietly but only after rerendering

function handleInc() {
  setLikes((likes) => likes + 1);
  setLikes((likes) => likes + 1);
  setLikes((likes) => likes + 1);
} // Fixes problem with not updated state value immedietly if this was not callback function likes would add only 1

// Scroll event doesnot bubble up

// OnClickCapture to handle capture phase

// useEffect is executed after render process

// useLayoutEffct exists

// Effects are only executed after browser paint

function handleAddWatched(movie) {
  setWatched((watched) => [...watched, movie]);
} // to create new array

// cant use early return or hooks inside if statements or in any nested structure becouse hooks ar actually defined by order they are created anything that can mess up order or change order is not allowed

// State is only rederend only on initial render(unless state is updated :))

const [watched, setWatched] = useState(function () {
  const storedValue = localStorage.getItem("watched");
  return JSON.parse(storedValue);
});

function callback(e) {
  if (document.activeElement === inputEl.current) return; // active element is where mouse focus is
  if (e.code !== "Enter") return;

  inputEl.current.focus(); // putting mouse focus
  setQuery(""); // removing if anything was in search only works if search is not focused
}

// We are not allowed to update useRef() in render logic

const [obj, setObj] = useState({});
const { lat, lng, error, isLoading } = obj;

const loca = useGeolocation();
function getPosition() {
  setCountClicks((count) => count + 1);

  // setObj({
  //   ...obj,
  //   lat: loca.lat,
  //   lng: loca.lng,
  //   error: loca.error,
  //   isLoading: loca.isLoading,
  // });

  setObj({ ...loca });
}

// if you want to use usereducer hook you need to props down dispatch

<></>; // fragment often used in react


const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const STARTER_BALANCE = 500;

function reducer(state, action) {
  if (!state.isActive && action.type !== "openAcc") return state;
  switch (action.type) {
    case "openAcc":
      return {
        ...state,
        balance: STARTER_BALANCE,
        isActive: !state.isActive,
      };

    case "reqLoan":
      if (state.loan !== 0) return state;
      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      };

    case "deposit":
      return { ...state, balance: state.balance + action.payload };

    case "withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "payLoan":
      if (state.balance < state.loan || state.loan === 0) return state;

      return { ...state, balance: state.balance - state.loan, loan: 0 };

    case "closeAcc":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );


  .nav :global(.active) {
    background-color: green;
  } // css

// 3rd party react router dom
<NavLink></NavLink>// also adds active class to that link can be distinguishable from other links

<Route path="cities/:id" element={<City />} /> // param is id in this case
// id from up route is connected to useparams id 
const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(); // Reading latitude an longitude from url
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");


  const navigate = useNavigate();
  navigate(-1); // to go back OR to go any place 
  // to change url 
   <div className={styles.mapContainer} onClick={() => navigate("form")}> </div>

// these 3 inside are outlets of outside
<Route>
  <Route></Route> 
  <Route></Route>
  <Route></Route>
</Route>

<Navigate replace to="cities" /> // redirect
<Route index element={<Navigate replace to="cities" />} />// index for default component replace to be able to go back

// 1) CREATE A CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect( // mostly used as synchronizing method
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    // 2) PROVIDE VALUE TO CHILD COMPONENTS
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        setIsFakeDark,
        isFakeDark,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };


CitiesProvider.propTypes = {
  children: PropTypes.object.isRequired,
}; // propvalidation

<label htmlFor="cityName">City name</label>
<input
  id="cityName"
  onChange={(e) => setCityName(e.target.value)}
  value={cityName}
/> // label inputs in react


// if you pass slowcomponent as children component and it will not rerender it

const handleAddPost = useCallback(function handleAddPost(post) {
  setPosts((posts) => [post, ...posts]);
}, []);

const archiveOption = useMemo(() => {
  return {
    show: false,
    title: `Post archve in addition to ${posts.length} main posts`,
  };
}, [posts]);

// setStates of useState hook are automatically memoized


const Archive = memo(function Archive({ archiveOption, onAddPost }) {
})// slow component example which we want to memoize

// one of usecases of memo is to memoize values used in dependency array