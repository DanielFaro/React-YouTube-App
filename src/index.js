import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import youtubeSearch from 'youtube-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import './index.css';
// const API_KEY = 'AIzaSyChAIt5WK61KboIBxaYiMNiXLu7LaK4A2k'; //api key for youtube
const API_KEY = 'AIzaSyDdKNB63q_HqhL0HBWZRfhgn-C_SzY7E8M';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');

    }

    videoSearch(term) {
        console.log(term);
        youtubeSearch(term, { key: API_KEY }, (err, videos) => { //videos can be called anything
            if (err) return console.log(err);
            console.dir(videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        console.log(this.state.videos);
        console.log(this.state.selectedVideo)
        return (
            <div>
                {this.state.videos !== [] &&
                    <div>
                        <SearchBar onSearchTermChange={videoSearch} />
                        <VideoDetail video={this.state.selectedVideo} />
                        <VideoList
                            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}//updates the app state with the newest selected video
                            videos={this.state.videos} />
                    </div>
                 }
            </div>
        );
    }
}

//take this component's generated HTML and put
//it on the page (DOM)
ReactDOM.render(<App />, document.querySelector('#root')); // possibly container not root