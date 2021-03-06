import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

function Home(){
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    console.log(loading);
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading?(
                    <h1>loading posts..</h1>
                ):(
                    data.getPosts && data.getPosts.map(post =>(
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            {/* 將資料傳入 */}
                            <PostCard post={post}/>
                        </Grid.Column>  
                    ))
                )}           
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id 
            body 
            createdAt 
            username 
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id 
                username 
                createdAt 
                body
            }
        }
    }
    
`

export default Home;