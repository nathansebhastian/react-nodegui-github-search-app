import React, { useState, useEffect } from 'react';
import {
  hot,
  Window,
  Text,
  View,
  LineEdit,
  Button,
  Image,
  ScrollArea,
} from '@nodegui/react-nodegui';
import axios from 'axios';
import open from 'open';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = username => {
    let url = `https://api.github.com/search/users?q=${username}`;
    axios
      .get(url)
      .then(res => {
        setUsers(res.data.items)
      })
      .catch(error => console.log('Oops! . There Is A Problem' + error));
  };

  useEffect(() => {
    fetchUsers('nsebhastian');
  }, [] );  

  return (
    <Window
      windowTitle='GitHub Search App'
      minSize={{width: 550, height: 450}}
      styleSheet={styleSheet}>
      <ScrollArea>
        <View id='container'>
          <View id='header'>
            <Text>GitHub Search App</Text>
            <Text>Search users in GitHub using this simple app</Text>
            <Text>
              Click on the card to see more detail about individual user. The
              search default is nsebhastian (me!)
            </Text>
          </View>
          <View id='search-bar'>
            <LineEdit
              placeholderText='Type username here and press Enter'
              id='search-input'
              text={keyword}
              on={{textChanged: setKeyword}}
            />
            <Button text='Submit' on={{
              clicked: () => {
                fetchUsers(keyword)
              }
            }} />
          </View>
          {
            users.map((item) => {
            return (
              <View key={item.id} id='card-row'>
                <Image
                  id='user-img'
                  src={item.avatar_url}
                />
                <View id='user-detail-row'>
                  <Text>{`Username: ${item.login}`}</Text>
                  <Text>{`Score: ${item.score}`}</Text>
                  <Button id='button-profile' text='Go to profile' on={{clicked: () => {
                    open(item.html_url)
                  }}}
                  />
                </View>
              </View>
            );
          })
          }
        </View>
      </ScrollArea>
    </Window>
  );
};

const styleSheet = `
  #container {
    flex: 1;
    padding: 20px;
  }
  #search-bar {
    flex-direction: 'row';
    justify-content: 'space-around';
    align-items: 'center';
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #search-input {
    flex: 1;
  }
  #card-row {
    flex-direction: 'row';
    background-color: 'white';
    border-bottom: 1px solid blue;
  }
  #user-img {
    height: 100px;
    width: 100px;
    padding-right: 10px;
  }
  #user-detail-row {
    flex:1;
    flex-direction: 'column';
    justify-content: 'space-around';
  }
  #button-profile {
    width: 150px;
  }
`;

export default hot(App);
