import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material';
import * as React from 'react';

export default function MultiActionAreaCard({ title, description, src, price, func, addCart }) {
    return (
        <Card 
            sx={{
                maxWidth: 300,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 5,
                }
            }}
        >
            <CardActionArea onClick={func}>
                <CardMedia
                    component="img"
                    height="200"
                    image={src}
                    alt={title}
                    sx={{
                        borderRadius: '8px 8px 0 0',
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {title.length <= 20 ? title : `${title.slice(0, 18)}...`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {description.length <= 75 ? description : `${description.slice(0, 75)}...`}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        ${price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button variant="outlined" size="small" color="primary" onClick={func}>
                        Show More
                    </Button>
                    <Button variant="outlined" size="small" color="primary" onClick={addCart}>
                        Add to Cart
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
