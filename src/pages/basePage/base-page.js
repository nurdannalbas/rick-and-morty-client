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
      page: -1,
      info: [],
      characters: [],
    }
    this.getNextPage = this.getNextPage.bind(this);
  }

  componentDidMount() {
    this.getNextPage();
  }
  
  async getNextPage() {
    this.state.page++;
    const data = await this.service.getCharacters(this.state.page);
    this.setState({ characters: [...this.state.characters, ...data.results], info: data.info });
    return data;
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
          <InfiniteScroll
            dataLength={this.state.characters.length}
            next={this.getNextPage}
            hasMore={this.state.page <= this.state.info.pages}
            loader={<h4>Loading...</h4> }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
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
      </React.Fragment>
    )
  }
}

export { BasePage };
