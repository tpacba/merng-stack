import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Dimmer, Loader, Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';

const FETCH_POST_QUERY = gql`
    query getPost($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            comments {
                id
                body
                username
                createdAt
            }
            likes {
                id
                username
                createdAt
            }
            likeCount
            commentCount
        }
    }
`

const SinglePost = (props) => {
    const { user } = useContext(AuthContext);

    const postId = props.match.params.postId;

    console.log(postId);

    const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;

    if (!getPost) {
        postMarkup = (
            <Dimmer active inverted>
                <Loader inverted content='Loading' />
            </Dimmer>
        );
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button as="div" labelPosition="right" onClick={() => console.log("comment attempt")}>
                                    <Button color='orange' basic>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='orange' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return (
        <div>

        </div>
    );
}

export default SinglePost;