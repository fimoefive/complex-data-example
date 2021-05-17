// TODO: Complete this file

import { getGroups } from './data/groupData';
import getUsers from './data/userData';
import getUserGroups from './data/userGroupsData';

const groupsWithUsers = () => new Promise((resolve, reject) => {
  // COMPLETE THIS FUNCTION
  Promise.all([getUsers(), getGroups(), getUserGroups()])
    .then(([users, groups, userGroupsJoin]) => {
      // console.warn(users, groups, userGroupsJoin);
      // console.warn('users', users);
      const allGroupInfoArray = [];

      groups.forEach((group) => {
        const groupRelationshipsArray = [];
        const userInfoArray = [];

        // Push all the relationships that apply to this group
        // Use the spread to not have an array of arrays instead an array of objects
        groupRelationshipsArray.push(...userGroupsJoin.filter((ug) => ug.group_id === group.id));
        // console.warn(groupRelationshipsArray);
        groupRelationshipsArray.forEach((groupRelationships) => {
          userInfoArray.push(users.find((user) => user.id === groupRelationships.user_id));
        });
        // console.warn(userInfoArray);
        allGroupInfoArray.push({ ...group, users: userInfoArray });
      });
      console.warn(allGroupInfoArray);
      resolve(allGroupInfoArray);
    }).catch((error) => reject(error));
});

export default groupsWithUsers;
