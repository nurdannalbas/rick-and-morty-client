import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Service } from '../../services/service'

class BasePage extends React.Component {

  constructor(props) {
    super(props);
    this.service = new Service()
    this.state = {
      page: 0,
      info: [],
      characters: [],
    }
    this.getNextPage = this.getNextPage.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  componentDidMount() {
    this.getNextPage(0)
  }
  componentDidUpdate(){
    this.getNextPage(this.state.page)
  }

  async getNextPage(page) {
    const data = await this.service.getCharacters(page)
    this.setState({ characters: [...this.state.characters, ...data.results], info: data.info })
    return data
  }

  async fetchMoreData() {
    this.state.page++
    this.getNextPage(this.state.page)
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Typography variant="h2" component="div" gutterBottom
        sx={{
          margin: 'auto',
          color: 'rgb(32, 35, 41)',
          border: 'none',
          textAlign: 'center',
          p:'1%'
        }}>
        The Rick and Morty Client
      </Typography>
        <div id="scrollableDiv" style={{ height: 'auto', overflow: "auto" }}>
          <InfiniteScroll
            dataLength={this.state.characters.length}
            next={this.fetchMoreData}
            hasMore={this.state.page <= this.state.info.pages}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >

              <Grid item sx={{
                float: 'none',
                margin: 'auto',
                maxWidth: '50%',
                borderRadius: '2%',
                display: 'flex',
                flexWrap: 'wrap',

              }} >
                {this.state.characters.map((character,idx) => (
                  <Grid item sx={{
                    backgroundColor: 'white',
                    flexBasis: '45%',
                    marginBottom: '3%',
                    marginLeft: '5%',
                    borderRadius: '5%',
                    textAlign: 'center',
                  }} key={idx}>
                    <Link to={`/detail/${character.id}`} style={{ textDecoration: 'none', color: 'black' }} >
                      <Typography variant="h6" component="div">
                        {character.name}
                      </Typography>
                      <Avatar alt="image" src={character.image} sx={{ margin: 'auto', width: 100, height: 100 }} />
                      <br></br>
                    </Link>
                  </Grid>))}
              </Grid>
          </InfiniteScroll>
        </div>

        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
        >
        </div>
      </React.Fragment>
    )
  }
}

export { BasePage };
