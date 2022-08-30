
import { Grid } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <Grid
            height="100"
            width="100"
            color="#3f51b5"
            ariaLabel="grid-loading"
            radius="12"
            visible={true}
            wrapperStyle={{ justifyContent: 'center' }}
        />
    ) 
}


