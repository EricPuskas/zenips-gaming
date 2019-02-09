import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  CREATE_ARTICLE,
  GET_MORE_ARTICLES,
  GET_INIT_ARTICLES,
  INIT_ARTICLES_LOADING,
  UPDATE_PAGE_ART,
  ARTICLES_LOADING,
  GET_ARTICLE,
  GET_SEARCH_ARTICLES,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_LOADING,
  DELETE_ARTICLE,
  DELETE_ARTICLE_LOADING,
  HIDE_MODAL,
  GET_TAGS,
  GET_TOP_ARTICLE
} from "./types";

// Create an Article
export const createArticle = (data, history) => dispatch => {
  dispatch(ArticlesLoading());
  axios
    .post("/api/articles/new", data)
    .then(() => () =>
      dispatch({
        type: CREATE_ARTICLE
      })
    )
    .then(() => history.push("/dashboard/articles"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getInitArticles = (per, page, search) => dispatch => {
  dispatch(clearErrors());
  let url;
  dispatch(InitArticlesLoading());
  if (search !== "") {
    dispatch(pageUpdateArticles(1));
    url = `/api/articles?per=${per}&page=1&search=${search}`;
  } else {
    dispatch(pageUpdateArticles(1));
    url = `/api/articles?per=${per}&page=1`;
  }
  axios
    .get(url)
    .then(res =>
      setTimeout(() => {
        dispatch({
          type: GET_INIT_ARTICLES,
          payload: res.data
        });
      }, 250)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getTopArticle = (per, page) => dispatch => {
  let url = `/api/articles?per=${per}&${page}=1&search=Most Popular`;
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_TOP_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const deleteArticle = (id, history) => dispatch => {
  axios
    .delete(`/api/articles/${id}`)
    .then(() => dispatch(DeleteArticleLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: DELETE_ARTICLE
        });
      }, 500)
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: HIDE_MODAL
        });
      }, 500)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/dashboard/articles");
      }, 500)
    )
    .catch(err => {
      dispatch(errorLoading());
      throw err;
    })
    .catch(err =>
      setTimeout(() => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, 500)
    );
};

export const getSearchArticles = (per, page, search) => dispatch => {
  dispatch(InitArticlesLoading());
  dispatch(pageUpdateArticles(1));
  axios
    .get(`/api/articles?per=${per}&page=1&search=${search}`)
    .then(res =>
      setTimeout(() => {
        dispatch({
          type: GET_SEARCH_ARTICLES,
          payload: res.data
        });
      }, 500)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Initial Posts
export const getArticle = id => dispatch => {
  dispatch(InitArticlesLoading());
  axios
    .get(`/api/articles/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get More Posts
export const getMoreArticles = (per, page, search) => dispatch => {
  let url;
  dispatch(ArticlesLoading());
  if (search !== "") {
    dispatch(pageUpdateArticles(page));
    url = `/api/articles?per=${per}&page=${page}&search=${search}`;
  } else {
    dispatch(pageUpdateArticles(page));
    url = `/api/articles?per=${per}&page=${page}`;
  }
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_MORE_ARTICLES,
        payload: res.data.articles
      })
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_ARTICLES,
        payload: null
      })
    );
};

// Update Article
export const updateArticle = (id, data, history) => dispatch => {
  dispatch(UpdateArticleLoading());
  axios
    .put(`/api/articles/${id}`, data)
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: UPDATE_ARTICLE
        });
      }, 500)
    )
    .then(() =>
      setTimeout(() => {
        history.push(`/dashboard/articles/${id}`);
      }, 500)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET ALL TAGS
export const getTags = () => dispatch => {
  axios
    .get("/api/tags")
    .then(res =>
      dispatch({
        type: GET_TAGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const deleteTags = data => dispatch => {
  axios
    .delete("/api/tags", { data })
    .then(() => dispatch(getTags()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const addTag = data => dispatch => {
  axios
    .post("/api/tags/new", data)
    .then(() => dispatch(getTags()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create an Article
export const InitArticlesLoading = () => {
  return {
    type: INIT_ARTICLES_LOADING
  };
};

// Set Delete loading state
export const DeleteArticleLoading = () => {
  return {
    type: DELETE_ARTICLE_LOADING
  };
};

export const ArticlesLoading = () => {
  return {
    type: ARTICLES_LOADING
  };
};

// Get Post loading state
export const UpdateArticleLoading = () => {
  return {
    type: UPDATE_ARTICLE_LOADING
  };
};

// UPDATE PAGE STATE
export const pageUpdateArticles = page => {
  return {
    type: UPDATE_PAGE_ART,
    payload: page
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Error Loading
export const errorLoading = () => {
  return {
    type: ERROR_LOADING
  };
};
