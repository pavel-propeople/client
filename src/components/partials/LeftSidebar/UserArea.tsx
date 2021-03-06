import React, { useState, useEffect } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Reusables
import Resource from 'components/reusables/particles/Resource';
import Button from 'components/reusables/form/Button';

// Icons
import { ReactComponent as CreditsIcon } from 'assets/icons/credits.svg';
import { ReactComponent as MoneyIcon } from 'assets/icons/money.svg';

// Actions
import { logout } from 'actions/user';

// Types
import AppState from 'redux/types/app';
import IResource from 'redux/types/reusables/Resource';

interface Props {}

const UserArea: React.FC<Props & RouteComponentProps> = ({ history }) => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [menu, setMenu] = useState('');
  const dispatch = useDispatch();

  const account = useSelector((state: AppState) => state.user.account.info);

  useEffect(() => {
    if (account && account.resources) {
      setResources(JSON.parse(account.resources.list));
    }
  }, [account]);

  return (
    <div className='UserArea'>
      <div className='welcome'>
        <span
          className={`highlight ${
            account!.status?.ConnectStat === 1 ? 'online' : 'offline'
          }`}
        >
          {account!.memb___id}
        </span>
        <Button
          value='logout'
          onClick={() => dispatch(logout(history))}
          style={{ width: 80 }}
        />
      </div>
      <div className='resources'>
        {resources.map((res: IResource, i: number) => (
          <Resource key={i} resource={res} />
        ))}
        <div className='main'>
          <div className='block credits'>
            <CreditsIcon />{' '}
            {account && account.resources
              ? account.resources.credits.toLocaleString()
              : ''}
          </div>
          <div className='block money'>
            <MoneyIcon />{' '}
            {account && account.resources
              ? account.resources.zen.toLocaleString()
              : ''}
          </div>
        </div>
      </div>
      <div className='menu'>
        <div className='section'>
          <div className='title' onClick={() => setMenu('account')}>
            Account
            <div className='underline'>
              <span className='line' />
            </div>
          </div>
          <div className={`content ${menu === 'account' ? 'open' : 'closed'}`}>
            <Link to='/user/account/password'>Change Password</Link>
            <Link to='/user/account/vip'>VIP Status</Link>
            <Link to='/user/account/online'>Online Time</Link>
            <Link to='/user/account/logs'>Logs</Link>
          </div>
        </div>
        <div className='section'>
          <div className='title' onClick={() => setMenu('char')}>
            Character
            <div className='underline'>
              <span className='line' />
            </div>
          </div>
          <div className={`content ${menu === 'char' ? 'open' : 'closed'}`}>
            <Link to='/user/char/reset'>Reset</Link>
            <Link to='/user/char/stats'>Add Stats</Link>
            <Link to='/user/char/name'>Change Name</Link>
            <Link to='/user/char/class'>Change Class</Link>
          </div>
        </div>
        <div className='section'>
          <div className='title' onClick={() => setMenu('extra')}>
            Extra Features
            <div className='underline'>
              <span className='line' />
            </div>
          </div>
          <div className={`content ${menu === 'extra' ? 'open' : 'closed'}`}>
            <Link to='/user/extra/market'>Market</Link>
            <Link to='/user/extra/auction'>Auction</Link>
            <Link to='/user/extra/storage'>Storage</Link>
            <Link to='/user/extra/resources'>Resources</Link>
            {/* <Link to='/user/extra/quests'>Quests</Link> */}
          </div>
        </div>
        {account && account.admin_lvl === 420 && (
          <div className='section'>
            <div className='title' onClick={() => setMenu('admin')}>
              Administration
              <div className='underline'>
                <span className='line' />
              </div>
            </div>
            <div className={`content ${menu === 'admin' ? 'open' : 'closed'}`}>
              <Link to='/user/admin/news'>Post News</Link>
              <Link to='/user/admin/config'>Configuration</Link>
              <Link to='/user/admin/adder'>Items and Resources</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserArea);
