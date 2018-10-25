const createStore = window.Redux.createStore;
const combineReducers = window.Redux.combineReducers;
const connect = window.ReactRedux.connect;
const Provider = window.ReactRedux.Provider;

const postsData = [
    { id: 1, likes: 0 },
    { id: 2, likes: 1 },
    { id: 3, likes: 0 },
    { id: 4, likes: 3 },
    { id: 5, likes: 2 },
];

// First, we're defining the initial state
const initialState = {
    posts: postsData,
    postsLikeCounters: postsData.reduce((out, post) => {
        return {
            ...out,
            [post.id]: post.likes
        };
    }, {})
};


// Then we're defining our reducers. Here I have 3 reducers:
// posts, postsLikes and postsLikeCounters
// Obviously you may want to use other data structures
function posts(state=posts, action) {
    return state;
}

function postsLikes(state={}, action) {
    switch (action.type) {
        case 'LIKE_POST':
            return {
                ...state,
                [action.post.id]: true
            };
        case 'UNLIKE_POST':
            return {
                ...state,
                [action.post.id]: false
            };
        default:
            return state;
    }
}

function postsLikeCounters(state={}, action) {
    let value;

    switch (action.type) {
        case 'LIKE_POST':
            value = state[action.post.id] || 0;

            return {
                ...state,
                [action.post.id]: value + 1
            };
        case 'UNLIKE_POST':
            value = state[action.post.id] || 0;

            return {
                ...state,
                [action.post.id]: Math.max(value - 1, 0)
            };
        default:
            return state;
    }
}

// Now we're combining all reducers into a single rootReducer
const rootReducer = combineReducers({
    posts,
    postsLikes,
    postsLikeCounters
});

// With rootReducer and the initialState we're ready to create our store
// To put it simple - store is a single place to keep the whole application state (instead of keeping it in specific components)
const store = createStore(rootReducer, initialState);


// Now we're going to define our components
const Post = (props) => (
    <div style={ {border:'1px solid #000', margin: 5} }>
        <strong>Post #{props.post.id}</strong>
        {props.liked ? (
            <button onClick={()=>props.onUnlike(props.post)}>
                Unlike
            </button>
        ) : (
            <button onClick={()=>props.onLike(props.post)}>
                Like
            </button>
        )}
        <span>({props.likes} likes)</span>
    </div>
);

const Posts = (props) => (
    <div>
        { props.posts.map(post => (
            <Post
                key={post.id}
                post={post}
                likes={props.postsLikeCounters[post.id]}
                liked={props.postsLikes[post.id]}
                onLike={props.onLike}
                onUnlike={props.onUnlike} />
        ) ) }
    </div>
);


// Define onLike and onUnlike actions
const onLike   = (post) => ({ type: 'LIKE_POST', post });
const onUnlike = (post) => ({ type: 'UNLIKE_POST', post });


// Create components that uses redux's store to manage state
const PostsWithLikes = connect(
    function(state){
        return {
            posts: state.posts,
            postsLikes: state.postsLikes,
            postsLikeCounters: state.postsLikeCounters
        };
    },
    {
        onLike,
        onUnlike
    }
)(Posts);


// And we're ready to put it all together:
const App = (
    <Provider store={store}>
        <div>
            <h1>all posts:</h1>
            <PostsWithLikes />
        </div>
    </Provider>
);

ReactDOM.render(
    App,
    document.getElementById('rootElement')
);
