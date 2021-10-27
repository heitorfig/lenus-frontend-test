import { styled } from '@mui/material/styles';

import Box from "@mui/material/Box";

const Header = styled((props) => (
  <Box component="header" {...props} />
))`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  -webkit-transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 1100;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  box-shadow: inset 0px -1px 1px #eaeef3;
  background-color: rgba(255,255,255,0.72);
`;

export default Header;