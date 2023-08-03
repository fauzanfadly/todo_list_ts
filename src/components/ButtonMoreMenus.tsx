import React from 'react';
import { Dropdown } from "react-bootstrap";
import { MdMoreVert } from "react-icons/md";
import { MenuModel } from "../models/MenuModel";
import styles from "../styles/button_more_menus.module.css";


interface ButtonMoreMenusProps {
  menus: Array<MenuModel>
}


const ButtonMoreMenus: React.FC<ButtonMoreMenusProps> = ({ menus }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='light' className={`rounded-circle py-0 px-1 pb-1 ${styles['dropdown-toggle']}`} id="dropdown-basic">
        <MdMoreVert></MdMoreVert>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {menus.map((menu, index) => (
          <Dropdown.Item key={index} onClick={menu.action}>{menu.title}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonMoreMenus;
