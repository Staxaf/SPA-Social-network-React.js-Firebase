const FOLLOW_UNFOLLOW = 'FOLLOW-UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState = {
    usersData: [
        {
            id: 1,
            isFollow: true,
            fullName: 'Patrick Jane',
            isDisplay: true,
            photoUrl: 'https://i.pinimg.com/originals/ea/bc/51/eabc51c8a7c1ac63c554d2e37d60edc7.jpg',
            location: {city: 'Kiev', country: 'Ukraine'}
        },
        {
            id: 2,
            isFollow: true,
            isDisplay: true,
            fullName: 'Teresa Lisbon',
            photoUrl: 'https://i.pinimg.com/originals/df/a5/07/dfa507ab454ba8a2f24e3406095a7048.png',
            location: {city: 'Sacramento', country: 'USA'}
        },
        {
            id: 3,
            isFollow: false,
            isDisplay: true,
            fullName: 'Wayne Rigsby',
            photoUrl: 'https://tvguide1.cbsistatic.com/mediabin/galleries/shows/m_r/mas_mh/mentalist/season5/the-mentalist208.jpg',
            location: {city: 'Toronto', country: 'Canada'}
        },
        {
            id: 4,
            isFollow: true,
            isDisplay: true,
            fullName: 'Kimble Cho',
            photoUrl: 'https://alchetron.com/cdn/kimball-cho-16508489-8b21-4cae-8a76-33849b566d6-resize-750.jpeg',
            location: {city: 'Pekin', country: 'China'}
        },
        {
            id: 5,
            isFollow: false,
            isDisplay: true,
            fullName: 'Grace Van Pelt',
            photoUrl: 'https://i.pinimg.com/originals/cb/9d/d8/cb9dd8025677f39d59885a1cbeb8cbfd.jpg',
            location: {city: 'Paris', country: 'France'}
        },
        {
            id: 6,
            isFollow: true,
            fullName: 'Patrick Jane',
            isDisplay: false,
            photoUrl: 'https://i.pinimg.com/originals/ea/bc/51/eabc51c8a7c1ac63c554d2e37d60edc7.jpg',
            location: {city: 'Kiev', country: 'Ukraine'}
        },
        {
            id: 7,
            isFollow: true,
            isDisplay: false,
            fullName: 'Teresa Lisbon',
            photoUrl: 'https://i.pinimg.com/originals/df/a5/07/dfa507ab454ba8a2f24e3406095a7048.png',
            location: {city: 'Sacramento', country: 'USA'}
        },
        {
            id: 8,
            isFollow: false,
            isDisplay: false,
            fullName: 'Wayne Rigsby',
            photoUrl: 'https://tvguide1.cbsistatic.com/mediabin/galleries/shows/m_r/mas_mh/mentalist/season5/the-mentalist208.jpg',
            location: {city: 'Toronto', country: 'Canada'}
        },
        {
            id: 9,
            isFollow: true,
            isDisplay: false,
            fullName: 'Kimble Cho',
            photoUrl: 'https://alchetron.com/cdn/kimball-cho-16508489-8b21-4cae-8a76-33849b566d6-resize-750.jpeg',
            location: {city: 'Pekin', country: 'China'}
        }
    ]
}

export const usersReducer = (state = initialState, action) => {
debugger
    switch (action.type) {
        case FOLLOW_UNFOLLOW:
            let stateCopy =  {
                ...state,
                usersData: [...state.usersData]
            }//!state.usersData[action.userId - 1].isFollow
            stateCopy.usersData[action.userId - 1].isFollow = !stateCopy.usersData[action.userId - 1].isFollow
            return stateCopy
        case SET_USERS:
            let newState = {...state};
            for(let i = 0; i < 5; i++){
                if(newState.usersData.length > action.id + i){
                    newState.usersData[action.id + i].isDisplay = true
                }
            }
            return newState
        default:
            return state
    }
}