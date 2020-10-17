import React from 'react';
import { Grid } from '@material-ui/core'
import { SearchBar, VideoDetail, VideoList, NavItem } from './components'
import YouTube from './api/youtube'

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount(){
        this.handleSubmit('Netflix Africa')
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    handleSubmit = async (searchTerm) => {
        const response = await YouTube.get('search', {
          params: {
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyAAavBuxkGBogQYZY7rWjWx3HQJjBX0Dho',
            q: searchTerm,
        }});

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0]})
    }

    render (){
        const { selectedVideo, videos } = this.state;
        return (

            <Grid justify="center" container spacing={10}>

                <Grid item xs = {11}>
                    <Grid container spacing = {10}>
                        <Grid item xs={12}>
                        <NavItem />
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={7}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={5}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;