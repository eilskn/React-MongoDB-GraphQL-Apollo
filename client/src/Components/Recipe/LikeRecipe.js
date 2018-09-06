import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../withSession';
import { GET_RECIPE, LIKE_RECIPE, UNLIKE_RECIPE } from '../../queries';

class LikeRecipe extends Component {
  state = {
    username: '',
    liked: false
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({
        liked: prevLiked,
        username
      });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      state => ({
        liked: !state.liked
      }),
      () => this.handleLike(likeRecipe, unlikeRecipe)
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        (data);
        await this.props.refetch();
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        (data);
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({
      query: GET_RECIPE,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    return username ? (
      <Mutation
        update={this.updateUnlike}
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
      >
        {unlikeRecipe => (
          <Mutation
            update={this.updateLike}
            mutation={LIKE_RECIPE}
            variables={{ _id, username }}
          >
            {likeRecipe => {
              return (
                <button
                  className={`${liked && 'delete-button'}`}
                  onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              );
            }}
          </Mutation>
        )}
      </Mutation>
    ) : (
      <p>
        <strong>Only login user can like</strong>
      </p>
    );
  }
}

export default withSession(LikeRecipe);
