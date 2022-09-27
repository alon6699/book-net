import { Grid } from "@mui/material";

const Forbidden = () => {
    return (
        <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
            marginTop={'5%'}
        >
            <Grid item xs={4}>
                <img src="/403-error.jpg" alt="403" height={"auto"} />
            </Grid>
        </Grid>
    );
};

export default Forbidden;
