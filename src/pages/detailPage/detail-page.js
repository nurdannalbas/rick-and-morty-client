import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from 'axios';

function DetailPage() {
    const { id } = useParams();
    const [character, setChar] = React.useState();
    const [episodes, setEpisode] = React.useState([]);
    React.useEffect(() => {
        async function getCharacter() {
            const res = await axios(`https://rickandmortyapi.com/api/character/${id}`)
            const char = await res.data;
            setChar(char);
            var index = 0
            var episodeArray = []
            const last5Episodes = char.episode.slice(char.episode.length - 5, char.episode.length);
            getEpisodes(last5Episodes[index])
            async function getEpisodes(url) {
                const res = await axios(url)
                const episode = await res.data;
                episodeArray.push(episode)
                if (index < 4) {
                    index++
                    getEpisodes(last5Episodes[index])
                }
                else if (index == 4) {
                    setEpisode(episodeArray)
                }
            }
        }
        getCharacter()
    },[id]);

    return (
        <React.Fragment>
            <CssBaseline />
            {character ? <Paper sx={{ p: 2, margin: 'auto', paddingTop: '2%', maxWidth: 500, flexGrow: 1 }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item>
                                    <Link to={`/`} style={{ textDecoration: 'none' }} >
                                        <Button variant="outlined" endIcon={<ArrowBackIcon />}>
                                            Back
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="name" component="div">
                                        <h2>{character.name}</h2>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="status" color="text.secondary" >
                                        {'Status: '}
                                    </Typography>
                                    <Typography variant="status" color="text.primary">
                                        {character.status} {"- Alien"}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="location" color="text.secondary">
                                        {'Last known location:'}
                                    </Typography>
                                    <Typography variant="location" color="text.primary">
                                        {character.location.name}
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography variant="last5Episodes" color="text.secondary">
                                        {'Last Five Episodes: '}<br></br>
                                    </Typography>
                                    {episodes.map((episode,idx) => (
                                        <Typography variant="last5Episodes" color="text.primary" key={idx}>
                                            <ul>
                                                <li>{episode.name}
                                                </li></ul>
                                        </Typography>))}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Avatar alt="image" src={character.image} sx={{ marginTop: '50px', width: 150, height: 150 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper> : <p>Loading</p>}
                
        </React.Fragment>
    )
}
export { DetailPage };
