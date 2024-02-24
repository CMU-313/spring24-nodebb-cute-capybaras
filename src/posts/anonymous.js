'use strict';

const db = require('../database');
const plugins = require('../plugins');

module.exports = function (Posts) {
    Posts.anonymous = async function (pid, uid) {
        return await toggleAnonymous('anonymous', pid, uid);
    };

    Posts.unanonymous = async function (pid, uid) {
        return await toggleAnonymous('unanonymous', pid, uid);
    };

    async function toggleAnonymous(type, pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const Anonymousing = type === 'anonymous';

        const [postData, isAnonymous] = await Promise.all([
            Posts.getPostFields(pid, ['pid', 'uid']),
            Posts.isAnonymous(pid, uid),
        ]);

        if (Anonymousing && isAnonymous) {
            throw new Error('[[error:already-anonymous]]');
        }

        if (!Anonymousing && !isAnonymous) {
            throw new Error('[[error:already-unanonymous]]');
        }

        if (Anonymousing) {
            await db.sortedSetAdd(`uid:${uid}:anonymous`, Date.now(), pid);
        } else {
            await db.sortedSetRemove(`uid:${uid}:anonymous`, pid);
        }
        await db[Anonymousing ? 'setAdd' : 'setRemove'](`pid:${pid}:user_anonymous`, uid);
        postData.anonymous = await db.setCount(`pid:${pid}:user_anonymous`);
        await Posts.setPostField(pid, 'anonymous', postData.isAnonymous);

        plugins.hooks.fire(`action:post.${type}`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: isAnonymous ? 'anonymous' : 'unanonymous',
        });

        return {
            post: postData,
            isAnonymous: Anonymousing,
        };
    }

    Posts.isAnonymous = async function (pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            return Array.isArray(pid) ? pid.map(() => false) : false;
        }

        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:users_anonymous`);
            return await db.isMemberOfSets(sets, uid);
        }
        return await db.isSetMember(`pid:${pid}:users_anonymous`, uid);
    };
};
