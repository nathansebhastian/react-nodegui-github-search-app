import React from "react";
import { hot, Window, Text } from "@nodegui/react-nodegui";
const App = () => {
 return (
   <Window>
       <Text>Hello World!</Text>
   </Window>
 );
};

export default hot(App);
