import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey } from '@mui/material/colors';

function MapOptions(...props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
      <div>
        <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
          <MoreVertIcon sx={{color: grey[50]}}/>
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
        >
          <MenuItem onClick={()=>{console.log('modifying');handleClose()}}>Modifier</MenuItem>
          <MenuItem onClick={handleClose}>Supprimer</MenuItem>
          <MenuItem onClick={handleClose}>Publier</MenuItem>
          <MenuItem onClick={()=>{handleClose();window.open(props[0]['img'], '_blank')}}>Agrandir</MenuItem>
        </Menu>
      </div>
  )
}

export default function MapList() {
  return (
      <ImageList sx={{ width: 700, height: 1000 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Nombre de scans : {itemData.length}</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                  src={item.img}
                  srcSet={item.img}
                  alt={item.title}
                  loading="lazy"
              />
              <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <MapOptions img={item.img}/>
                  }
              />
            </ImageListItem>
        ))}
      </ImageList>
  );
}

const itemData = [
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 1',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 2',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 3',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 4',
    cols: 2,
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 5',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 6',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 7',
  },
];
