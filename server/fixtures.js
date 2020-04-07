const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();
    for (let collection of collections) {
        await collection.drop();
    }

    const users = await User.create({
        username: 'user',
        password: '123',
        role: 'user',
        token: nanoid(),
        displayName: 'User',
    }, {
        username: 'admin',
        password: '123',
        role: 'admin',
        token: nanoid(),
        displayName: 'Admin',
    });

    const artists = await Artist.create(
        {
            title: 'Beatles',
            image: 'beatles.jpeg',
            description: 'Legendary British band',
            publisher: users[0]._id,
        },
        {
            title: 'Melnitsa',
            image: 'melnitsa.jpg',
            description: 'Russian folk-group',
            publisher: users[1]._id,
        },
    );

    const albums = await Album.create(
        {
            title: 'Please Please Me',
            artist: artists[0]._id,
            issueDate: '1963',
            image: 'please_please_me.jpg',
            publisher: users[0]._id,
        },
        {
            title: 'With the Beatles',
            artist: artists[0]._id,
            issueDate: '1963',
            image: 'with_the_beatles.jpg',
            publisher: users[0]._id,
        },
        {
            title: 'Pereval',
            artist: artists[1]._id,
            issueDate: '2005',
            image: 'pereval.jpg',
            publisher: users[1]._id,
        },
        {
            title: 'Zov krovi',
            artist: artists[1]._id,
            issueDate: '2006',
            image: 'zov_krovi.jpg',
            publisher: users[1]._id,
        },
    );

    const tracks = await Track.create(
        {
            title: 'I saw her standing there',
            album: albums[0]._id,
            duration: '2:55',
            sequence: 1,
            publisher: users[0]._id,
        },
        {
            title: 'Misery',
            album: albums[0]._id,
            duration: '1:49',
            sequence: 2,
            publisher: users[0]._id,
        },
        {
            title: 'Anna (Go to him)',
            album: albums[0]._id,
            duration: '2:55',
            sequence: 3,
            publisher: users[0]._id,
        },
        {
            title: 'Chains',
            album: albums[0]._id,
            duration: '2:23',
            sequence: 4,
            publisher: users[0]._id,
        },
        {
            title: 'Boys',
            album: albums[0]._id,
            duration: '2:24',
            sequence: 5,
            publisher: users[0]._id,
        },
        {
            title: 'Ask me why',
            album: albums[0]._id,
            duration: '2:24',
            sequence: 6,
            publisher: users[0]._id,
        },
        {
            title: 'Please please me',
            album: albums[0]._id,
            duration: '1:59',
            sequence: 7,
            publisher: users[0]._id,
        },
        {
            title: 'Love me do',
            album: albums[0]._id,
            duration: '2:21',
            sequence: 8,
            publisher: users[0]._id,
        },
        {
            title: 'P.S. I love you',
            album: albums[0]._id,
            duration: '2:04',
            sequence: 9,
            publisher: users[0]._id,
        },
        {
            title: "Baby it's you",
            album: albums[0]._id,
            duration: '2:40',
            sequence: 10,
            publisher: users[0]._id,
        },
        {
            title: 'Do you want to know a secret',
            album: albums[0]._id,
            duration: '1:56',
            sequence: 11,
            publisher: users[0]._id,
        },{
            title: 'A taste of honey',
            album: albums[0]._id,
            duration: '2:03',
            sequence: 12,
            publisher: users[0]._id,
        },
        {
            title: "There's a place",
            album: albums[0]._id,
            duration: '1:51',
            sequence: 13,
            publisher: users[0]._id,
        },
        {
            title: 'Twist and shout',
            album: albums[0]._id,
            duration: '2:32',
            sequence: 14,
            publisher: users[0]._id,
        },
        {
            title: "It won't be long",
            album: albums[1]._id,
            duration: "2:13",
            sequence: 1,
            publisher: users[0]._id,
        },
        {
            title: "All I've got to do",
            album: albums[1]._id,
            duration: "2:02",
            sequence: 2,
            publisher: users[0]._id,
        },
        {
            title: "All my loving",
            album: albums[1]._id,
            duration: "2:07",
            sequence: 3,
            publisher: users[0]._id,
        },
        {
            title: "Don't bother me",
            album: albums[1]._id,
            duration: "2:28",
            sequence: 4,
            publisher: users[0]._id,
        },
        {
            title: "Little child",
            album: albums[1]._id,
            duration: "1:46",
            sequence: 5,
            publisher: users[0]._id,
        },
        {
            title: "Till there was you",
            album: albums[1]._id,
            duration: "2:14",
            sequence: 6,
            publisher: users[0]._id,
        },
        {
            title: "Please mr.Postman",
            album: albums[1]._id,
            duration: "2:34",
            sequence: 7,
            publisher: users[0]._id,
        },
        {
            title: "Roll over Beethoven",
            album: albums[1]._id,
            duration: "2:45",
            sequence: 8,
            publisher: users[0]._id,
        },
        {
            title: "Hold me tight",
            album: albums[1]._id,
            duration: "2:32",
            sequence: 9,
            publisher: users[0]._id,
        },
        {
            title: "You really got a hold on me",
            album: albums[1]._id,
            duration: "3:01",
            sequence: 10,
            publisher: users[0]._id,
        },
        {
            title: "I wanna be your man",
            album: albums[1]._id,
            duration: "1:59",
            sequence: 11,
            publisher: users[0]._id,
        },
        {
            title: "Devil in her heart",
            album: albums[1]._id,
            duration: "2:26",
            sequence: 12,
            publisher: users[0]._id,
        },
        {
            title: "Not a second time",
            album: albums[1]._id,
            duration: "2:07",
            sequence: 13,
            publisher: users[0]._id,
        },
        {
            title: "Money (That's what I want)",
            album: albums[1]._id,
            duration: "2:49",
            sequence: 14,
            publisher: users[0]._id,
        },
        {
            title: "Nochnaya kobyla",
            album: albums[2]._id,
            duration: "4:04",
            sequence: 1,
            publisher: users[1]._id,
        },
        {
            title: "Gospodin gornyh dorog",
            album: albums[2]._id,
            duration: "5:18",
            sequence: 2,
            publisher: users[1]._id,
        },
        {
            title: "Vesna",
            album: albums[2]._id,
            duration: "3:43",
            sequence: 3,
            publisher: users[1]._id,
        },
        {
            title: "Fuga",
            album: albums[2]._id,
            duration: "3:16",
            sequence: 4,
            publisher: users[1]._id,
        },
        {
            title: "Chujoi",
            album: albums[2]._id,
            duration: "4:32",
            sequence: 5,
            publisher: users[1]._id,
        },
        {
            title: "Voron",
            album: albums[2]._id,
            duration: "5:16",
            sequence: 6,
            publisher: users[1]._id,
        },
        {
            title: "Golem",
            album: albums[2]._id,
            duration: "2:06",
            sequence: 7,
            publisher: users[1]._id,
        },
        {
            title: "Mertvec",
            album: albums[2]._id,
            duration: "3:55",
            sequence: 8,
            publisher: users[1]._id,
        },
        {
            title: "Veresk",
            album: albums[2]._id,
            duration: "4:11",
            sequence: 9,
            publisher: users[1]._id,
        },
        {
            title: "Pryalka",
            album: albums[2]._id,
            duration: "6:14",
            sequence: 10,
            publisher: users[1]._id,
        },
        {
            title: "Korolevna",
            album: albums[2]._id,
            duration: "5:13",
            sequence: 11,
            publisher: users[1]._id,
        },
        {
            title: "Veresk (Inst.ver.)",
            album: albums[2]._id,
            duration: "4:14",
            sequence: 12,
            publisher: users[1]._id,
        },
        {
            title: "Nevesta Poloza",
            album: albums[3]._id,
            duration: "4:32",
            sequence: 1,
            publisher: users[1]._id,
        },
        {
            title: "Zov krovi",
            album: albums[3]._id,
            duration: "3:59",
            sequence: 2,
            publisher: users[1]._id,
        },
        {
            title: "Dveri Tamerlana",
            album: albums[3]._id,
            duration: "3:29",
            sequence: 3,
            publisher: users[1]._id,
        },
        {
            title: "Travushka",
            album: albums[3]._id,
            duration: "3:55",
            sequence: 4,
            publisher: users[1]._id,
        },
        {
            title: "Sestra",
            album: albums[3]._id,
            duration: "3:32",
            sequence: 5,
            publisher: users[1]._id,
        },
        {
            title: "Polnolunie",
            album: albums[3]._id,
            duration: "4:14",
            sequence: 6,
            publisher: users[1]._id,
        },
        {
            title: "Skazka o Diavole",
            album: albums[3]._id,
            duration: "6:41",
            sequence: 7,
            publisher: users[1]._id,
        },
        {
            title: "Drakon",
            album: albums[3]._id,
            duration: "3:59",
            sequence: 8,
            publisher: users[1]._id,
        },
        {
            title: "Ai, volna",
            album: albums[3]._id,
            duration: "4:15",
            sequence: 9,
            publisher: users[1]._id,
        },
        {
            title: "Voroji",
            album: albums[3]._id,
            duration: "3:40",
            sequence: 10,
            publisher: users[1]._id,
        },
        {
            title: "Ogon'",
            album: albums[3]._id,
            duration: "5:03",
            sequence: 11,
            publisher: users[1]._id,
        },
        {
            title: "Lenta v volosah",
            album: albums[3]._id,
            duration: "3:05",
            sequence: 12,
            publisher: users[1]._id,
        },
        {
            title: "Belaya koshka",
            album: albums[3]._id,
            duration: "4:41",
            sequence: 13,
            publisher: users[1]._id,
        },
        {
            title: "Rapunzel",
            album: albums[3]._id,
            duration: "2:26",
            sequence: 14,
            publisher: users[1]._id,
        },
    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});