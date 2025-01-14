import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './BattleChat.css';

const BattleChat = ({ battle }) => {

  const heroesObj = useSelector(state => state.heroes?.userHeroes);
  const userHeroes = Object.values(heroesObj);
  const hero = userHeroes.find(hero => hero.id === battle?.heroId);

  const monstersObj = useSelector(state => state.monsters?.monsters);
  const monsters = Object.values(monstersObj);
  const monster = monsters.find(monster => monster.id === battle?.monsterId);

  const [messages, setMessages] = useState([
    {message: `Battle started between ${hero.name} and ${monster.name}!`}
  ]);
  const [healthH, setHealthH] = useState(battle.heroHp);
  const [healthM, setHealthM] = useState(battle.monsterHp);
  const webSocket = useRef(null);
  

  useEffect(() => {
    if (battle.monsterHp !== healthM) {
        const newMessage = {
            type: `hero`,
            message: `${hero.name} has attacked! ${monster.name} lost 5 hp.`,
            created: new Date(),
        };

        const jsonNewMessage = JSON.stringify({
            type: 'send-chat-message',
            data: newMessage,
        });
        let newMsg = JSON.parse(jsonNewMessage);
        console.log(`Sending message: ${newMsg.data.message}...`);

        if (webSocket.current) {
            webSocket.current.send(jsonNewMessage);
        }
        setHealthM(battle.monsterHp);
        setMessages(prevMessages => [...prevMessages, newMessage]);
        }

        if (battle.heroHp !== healthH) {
        const newMessage = {
            type: `monster`,
            message: `${monster.name} has attacked! ${hero.name} lost 5 hp.`,
            created: new Date(),
        };

        const jsonNewMessage = JSON.stringify({
            type: 'send-chat-message',
            data: newMessage,
        });

        let newMsg = JSON.parse(jsonNewMessage);
        console.log(`Sending message: ${newMsg.data.message}...`);

        if (webSocket.current) {
            webSocket.current.send(jsonNewMessage);
        }
        setHealthH(battle.heroHp);
        //set back to other after updateBattle is separated
        //calls function to add delay for other message
        setMessages(prevMessages => [...prevMessages, newMessage]);
        // setMessages([...messages, newMsg]);
        }
    }, [battle.heroHp, battle.monsterHp]);

    console.log('[MESSAGES]', messages)

  return (
    <div className='chat-wrapper'>
      {messages.map(msg => {
        return (
            <li className={`${msg.type}-chat`}>
                {msg.message}
            </li>
        )
      })}
    </div>
  );
};

export default BattleChat;
