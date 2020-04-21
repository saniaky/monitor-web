import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { MainListItems, SecondaryListItems } from './MenuItems'
import styled from 'styled-components'

const ToolbarIcon = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    min-height: 64px;
  `}
`

const DrawerToolbar = ({ onClose }) => {
  return (
    <>
      <ToolbarIcon>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </ToolbarIcon>
      <Divider light />
      <List>
        <MainListItems />
      </List>
      <Divider light />
      <List>
        <SecondaryListItems />
      </List>
    </>
  )
}

export default DrawerToolbar
