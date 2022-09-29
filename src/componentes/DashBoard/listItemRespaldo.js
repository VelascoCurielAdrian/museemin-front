import React from 'react';
import {
  Tooltip, IconButton,
  List, ListItem, ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useLocation, Link } from 'react-router-dom';
import Typography from '../Typography';
import { MENU_OPCIONES, setSidebarIsOpen } from '../../ducks/appbar';
import styles from './styles';

const Sidebar = ({mostrarLista}) => {
  const dispatch = useDispatch();
  const classes = styles();
  const location = useLocation();
  const { indexActivo, sidebarIsOpen, permisos } = useSelector(({
    appbar: { indexActivo, sidebarIsOpen, permisos },
  }) => ({ indexActivo, sidebarIsOpen, permisos }));

  const handleSidebar = () => dispatch(setSidebarIsOpen());

  return (
    <div className={clsx(classes.root, { sidebarIsOpen, mostrarLista })}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <div style={{ flex: 4, textAlign: 'center', paddingTop: 10 }}>
          <div className={classes.btnOpenContainer}>
            {sidebarIsOpen && (
              <Typography className={classes.title}>
                {MENU_OPCIONES[indexActivo].label}
              </Typography>
            )}
            <IconButton
              size="small"
              onClick={handleSidebar}
              className={clsx(classes.btnOpen, {
                sidebarIsOpen
              })}>
              <RiArrowRightSLine />
            </IconButton>
          </div>
          <List>
            {MENU_OPCIONES[indexActivo].submenu &&
              MENU_OPCIONES[indexActivo].submenu
                .filter(({ id }) => permisos.map(({ moduloID }) => moduloID).includes(id))
                .map((opcion, index) => (
                  <Link key={opcion.id} to={opcion.link} className={classes.link}>
                    <Tooltip title={!sidebarIsOpen ? opcion.label : ''}>
                      <ListItem button className={clsx(classes.item, {
                        sidebarOpen: sidebarIsOpen,
                        active: location.pathname.includes(opcion.link),
                      })}>
                        <ListItemText>
                          {sidebarIsOpen ? opcion.label : opcion.label.substring(0, 2)}
                          <Typography component="p">
                            {sidebarIsOpen ? opcion.sublabel : opcion.sublabel.substring(0,3)}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Tooltip>
                  </Link>
                ))}
          </List>
        </div>
      </div>
      { mostrarLista }
    </div>
  );
};

export default Sidebar;
