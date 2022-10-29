import React from "react";
import { Grid, Card } from "./styles";
import Skeleton from "react-loading-skeleton";

const TestFeedSkeleton = () => {
    return (
        <Grid>
            {Array(6)
                .fill()
                .map((_, index) => (
                    <Card key={index} to="nothing">
                        <h2>
                            <Skeleton duration={1} height={30} width={300} />
                        </h2>
                    </Card>
                ))}
        </Grid>
    );
};

export default TestFeedSkeleton;
