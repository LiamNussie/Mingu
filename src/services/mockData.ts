import { User, Chat } from '../types';

const datingAppData: User[] = [
  {
    id: 'usr_8k2m9n4p',
    name: 'Beatrice Taylor',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    bio: 'Adventure seeker and photography enthusiast. Love exploring new places and trying different cuisines. Looking for someone to share life\'s beautiful moments with! 📸✈️',
    isMatched: true,
    conversations: [
      {
        id: 'msg_1a2b3c',
        text: 'Hey! I saw we matched 😊',
        timestamp: '2025-09-25T14:30:00Z',
        senderId: 'usr_8k2m9n4p',
        isRead: true
      },
      {
        id: 'msg_2d3e4f',
        text: 'Hey Beatrice! Your travel photos are amazing! Where was that sunset shot taken?',
        timestamp: '2025-09-25T15:45:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_3g4h5i',
        text: 'Thank you! That was in Santorini last month. The light there is just incredible for photography',
        timestamp: '2025-09-25T16:20:00Z',
        senderId: 'usr_8k2m9n4p',
        isRead: true
      },
      {
        id: 'msg_4j5k6l',
        text: 'I\'ve always wanted to go there! What\'s next on your travel list?',
        timestamp: '2025-09-25T16:25:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_5m6n7o',
        text: 'Planning a trip to Iceland for the Northern Lights! Are you into traveling too?',
        timestamp: '2025-09-25T18:10:00Z',
        senderId: 'usr_8k2m9n4p',
        isRead: true
      },
      {
        id: 'msg_6n7o8p',
        text: 'Iceland sounds incredible! I\'ve always wanted to see the Northern Lights. When are you planning to go?',
        timestamp: '2025-09-25T19:30:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_7h3j5k9l',
    name: 'Carmen Rodriguez',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=face',
    bio: 'Music is my language, art is my passion. Concert-goer, vinyl collector, and amateur painter. Let\'s discover new bands together and paint the town red! 🎵🎨',
    isMatched: false,
    conversations: []
  },
  {
    id: 'usr_9m2n8p4q',
    name: 'Delilah Brooks',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Wellness enthusiast and yoga instructor. Believer in mindful living and positive energy. When I\'m not teaching, you\'ll find me at farmers markets or reading in coffee shops ☕️🧘‍♀️',
    isMatched: true,
    conversations: [
      {
        id: 'msg_6p7q8r',
        text: 'Hi! Love your energy in your photos 🌟',
        timestamp: '2025-09-26T10:15:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_7s8t9u',
        text: 'Aww thank you! Positive vibes only ✨ I see you\'re into fitness too?',
        timestamp: '2025-09-26T11:30:00Z',
        senderId: 'usr_9m2n8p4q',
        isRead: true
      },
      {
        id: 'msg_8v9w0x',
        text: 'Yeah! I\'ve been wanting to try yoga actually. Any beginner tips?',
        timestamp: '2025-09-26T12:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_9y0z1a',
        text: 'Start with gentle flows! I actually teach beginner classes on weekends if you\'re interested 🧘‍♀️',
        timestamp: '2025-09-26T12:45:00Z',
        senderId: 'usr_9m2n8p4q',
        isRead: true
      },
      {
        id: 'msg_0z1a2b',
        text: 'That would be amazing! What time are your weekend classes?',
        timestamp: '2025-09-26T13:15:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_3c6d9e2f',
    name: 'Evangeline Price',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face',
    bio: 'Book lover and coffee enthusiast. Currently reading through the classics and hunting for the perfect espresso. Let\'s discuss our favorite novels over lattes! ☕️📚',
    isMatched: false,
    conversations: []
  },
  {
    id: 'usr_5g8h1i4j',
    name: 'Francesca Green',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=face',
    bio: 'Travel blogger and food photographer. Just got back from Thailand and already planning my next adventure. Love discovering hidden gems and local cuisines! 🌸🍜',
    isMatched: true,
    conversations: [
      {
        id: 'msg_0b1c2d',
        text: 'Your Thailand food photos are making me so hungry! 🤤',
        timestamp: '2025-09-24T20:30:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_1e2f3g',
        text: 'Haha right?? The street food there is incredible. Have you been to Southeast Asia?',
        timestamp: '2025-09-24T21:15:00Z',
        senderId: 'usr_5g8h1i4j',
        isRead: true
      },
      {
        id: 'msg_2h3i4j',
        text: 'Not yet, but it\'s definitely on my list now! What was your favorite dish?',
        timestamp: '2025-09-24T21:20:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_3k4l5m',
        text: 'Pad Thai from this tiny stall in Bangkok - life changing! I have the exact location saved 📍',
        timestamp: '2025-09-24T21:35:00Z',
        senderId: 'usr_5g8h1i4j',
        isRead: true
      },
      {
        id: 'msg_4n5o6p',
        text: 'You\'ll have to share your hidden gems list with me!',
        timestamp: '2025-09-25T08:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_5q6r7s',
        text: 'Absolutely! I love sharing food adventures 😊 Where should we grab our first meal together?',
        timestamp: '2025-09-25T09:30:00Z',
        senderId: 'usr_5g8h1i4j',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_2k5l8m1n',
    name: 'Gabrielle Stone',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Medical student with a passion for hiking and nature photography. Balancing studies with weekend adventures. Looking for someone who loves the outdoors as much as I do! 🏔️📷',
    isMatched: false,
    conversations: []
  },
  {
    id: 'usr_6o9p2q5r',
    name: 'Hazel Windsor',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&crop=face',
    bio: 'Software designer by day, stargazer by night. Love creating beautiful interfaces and exploring the cosmos. Let\'s design something amazing together! 🌟💻',
    isMatched: true,
    conversations: [
      {
        id: 'msg_6t7u8v',
        text: 'Fellow designer here! Your portfolio looks amazing 🎨',
        timestamp: '2025-09-26T16:45:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_7w8x9y',
        text: 'Thank you! What kind of design work do you do?',
        timestamp: '2025-09-26T17:20:00Z',
        senderId: 'usr_6o9p2q5r',
        isRead: true
      },
      {
        id: 'msg_8z9a0b',
        text: 'Mostly web and mobile apps. I love the intersection of beautiful and functional',
        timestamp: '2025-09-26T17:25:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_9c0d1e',
        text: 'Yes! Good design should be invisible but impactful. Also, did you see the meteor shower last night? 🌠',
        timestamp: '2025-09-26T18:00:00Z',
        senderId: 'usr_6o9p2q5r',
        isRead: true
      },
      {
        id: 'msg_0d1e2f',
        text: 'I missed it! Was it amazing? I always forget to check when these events happen',
        timestamp: '2025-09-26T18:30:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_3k6l9m2n',
    name: 'Tessa Blake',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?w=400&h=400&fit=crop&crop=face',
    bio: 'Elementary school teacher and children\'s book author. Inspiring young minds and writing magical stories. Believe in the power of imagination and kindness! 📖👩‍🏫',
    isMatched: true,
    conversations: [
      {
        id: 'msg_1q2r3s',
        text: 'I saw you published a children\'s book! That\'s incredible. What\'s it about?',
        timestamp: '2025-09-27T11:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_2t3u4v',
        text: 'Thank you! It\'s about a little girl who discovers her drawings come to life at night 📚✨ Very rewarding to write',
        timestamp: '2025-09-27T11:45:00Z',
        senderId: 'usr_3k6l9m2n',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_8w1x4y7z',
    name: 'Juniper Cole',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face',
    bio: 'Environmental scientist and weekend gardener. Passionate about sustainability and growing my own herbs. Let\'s plant seeds for a beautiful future! 🌱🌿',
    isMatched: true,
    conversations: [
      {
        id: 'msg_0f1g2h',
        text: 'Your herb garden looks incredible! I\'ve been trying to grow basil but keep killing it 😅',
        timestamp: '2025-09-27T08:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_1i2j3k',
        text: 'Haha basil can be tricky! The secret is not overwatering. Are you growing it indoors?',
        timestamp: '2025-09-27T08:30:00Z',
        senderId: 'usr_8w1x4y7z',
        isRead: true
      },
      {
        id: 'msg_2l3m4n',
        text: 'Yeah, on my kitchen windowsill. Maybe that\'s the problem?',
        timestamp: '2025-09-27T08:35:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_3m4n5o',
        text: 'Windowsills can be tricky! Does it get direct morning sun? Basil loves light but not harsh afternoon heat',
        timestamp: '2025-09-27T09:00:00Z',
        senderId: 'usr_8w1x4y7z',
        isRead: true
      },
      {
        id: 'msg_4n5o6p',
        text: 'It gets morning sun but then shade in the afternoon. Maybe I should try again with your tips!',
        timestamp: '2025-09-27T09:15:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_9e2f5g8h',
    name: 'Luna Pierce',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1598966739654-5e9a252d8c32?w=400&h=400&fit=crop&crop=face',
    bio: 'Chef and culinary explorer. Specializing in fusion cuisine and always experimenting with new flavors. Cooking is love made visible. Want to taste life together? 👩‍🍳🍽️',
    isMatched: true,
    conversations: [
      {
        id: 'msg_3o4p5q',
        text: 'That fusion dish you posted looked amazing! What inspired it?',
        timestamp: '2025-09-25T19:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_4r5s6t',
        text: 'Thanks! It\'s Korean-Mexican fusion - kimchi tacos with gochujang aioli. I love mixing unexpected flavors!',
        timestamp: '2025-09-25T19:45:00Z',
        senderId: 'usr_9e2f5g8h',
        isRead: true
      },
      {
        id: 'msg_5u6v7w',
        text: 'That sounds incredible! I\'m always down to try new food. Do you cook professionally?',
        timestamp: '2025-09-25T20:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_6x7y8z',
        text: 'I do! I run a small fusion restaurant downtown. You should come try our tasting menu sometime 😊',
        timestamp: '2025-09-25T20:30:00Z',
        senderId: 'usr_9e2f5g8h',
        isRead: true
      },
      {
        id: 'msg_7a8b9c',
        text: 'I\'d love that! What\'s the name of your restaurant?',
        timestamp: '2025-09-26T10:00:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_5m8n1o4p',
    name: 'Natalie Fox',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=face',
    bio: 'Marine biologist and scuba diving instructor. Protecting our oceans and teaching others to explore underwater worlds. Ready to dive deep into something real? 🌊🐠',
    isMatched: true,
    conversations: [
      {
        id: 'msg_8d9e0f',
        text: 'Your underwater photography is stunning! How long have you been diving?',
        timestamp: '2025-09-24T14:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_9g0h1i',
        text: 'Thank you! About 8 years now. Started in college and never looked back. The ocean is my second home 🌊',
        timestamp: '2025-09-24T15:30:00Z',
        senderId: 'usr_5m8n1o4p',
        isRead: true
      },
      {
        id: 'msg_0j1k2l',
        text: 'That\'s amazing! I\'ve always wanted to try scuba diving but I\'m a bit nervous about it',
        timestamp: '2025-09-24T15:45:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_1m2n3o',
        text: 'Totally understandable! I teach beginner courses - very patient and safety-focused. Would you be interested in a discovery dive? 🤿',
        timestamp: '2025-09-24T16:20:00Z',
        senderId: 'usr_5m8n1o4p',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_1u4v7w0x',
    name: 'Penelope Cross',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=400&fit=crop&crop=face',
    bio: 'Fashion designer and sustainability advocate. Creating beautiful clothes with a conscience. Thrifting, sewing, and making the world more stylish, one outfit at a time! ✂️👗',
    isMatched: true,
    conversations: [
      {
        id: 'msg_2p3q4r',
        text: 'Love your sustainable fashion approach! That vintage jacket you redesigned is incredible',
        timestamp: '2025-09-26T13:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_3s4t5u',
        text: 'Thank you! Found it at a thrift store for $5 and gave it new life ✨ Fashion should be creative AND conscious',
        timestamp: '2025-09-26T14:15:00Z',
        senderId: 'usr_1u4v7w0x',
        isRead: true
      },
      {
        id: 'msg_4v5w6x',
        text: 'That\'s amazing! I\'ve been trying to shop more sustainably. Any thrifting tips?',
        timestamp: '2025-09-26T14:30:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_5w6x7y',
        text: 'Yes! Go early in the morning for best selection, and always check the fabric quality. Also, don\'t be afraid to alter pieces!',
        timestamp: '2025-09-26T15:00:00Z',
        senderId: 'usr_1u4v7w0x',
        isRead: true
      },
      {
        id: 'msg_6x7y8z',
        text: 'Great advice! I never thought about altering. Do you do that yourself or take it somewhere?',
        timestamp: '2025-09-26T15:30:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_7c0d3e6f',
    name: 'Ruby Walsh',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&crop=face',
    bio: 'Professional rock climber and adventure filmmaker. Scaling peaks and capturing breathtaking moments. Always seeking the next summit and the perfect shot! 🧗‍♀️🎬',
    isMatched: true,
    conversations: [
      {
        id: 'msg_5y6z7a',
        text: 'That cliff shot in your reel gave me vertigo! 😵 How do you film while climbing?',
        timestamp: '2025-09-23T16:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_6b7c8d',
        text: 'Haha lots of practice! GoPros and drone work mostly. The adrenaline makes it worth it 🏔️',
        timestamp: '2025-09-23T17:30:00Z',
        senderId: 'usr_7c0d3e6f',
        isRead: true
      },
      {
        id: 'msg_7e8f9g',
        text: 'I can imagine! Do you ever take beginners climbing? I\'ve done some indoor stuff but never outdoors',
        timestamp: '2025-09-23T18:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_8h9i0j',
        text: 'Absolutely! There are some great beginner crags nearby. I love introducing people to the sport 🧗‍♀️',
        timestamp: '2025-09-23T18:45:00Z',
        senderId: 'usr_7c0d3e6f',
        isRead: true
      },
      {
        id: 'msg_9k0l1m',
        text: 'That sounds amazing! I\'d love to try it sometime if you\'re up for it',
        timestamp: '2025-09-24T09:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_0n1o2p',
        text: 'Definitely! Weather looks perfect this weekend. Want to check out some local spots? ⛰️',
        timestamp: '2025-09-24T12:00:00Z',
        senderId: 'usr_7c0d3e6f',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_9s2t5u8v',
    name: 'Vera Dixon',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=400&h=400&fit=crop&crop=face',
    bio: 'Physical therapist and marathon runner. Helping others heal and pushing my own limits. Training for Boston Marathon while making every step count! 🏃‍♀️💪',
    isMatched: true,
    conversations: [
      {
        id: 'msg_3w4x5y',
        text: 'Boston Marathon training! That\'s amazing. How\'s the training going?',
        timestamp: '2025-09-26T06:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_4z5a6b',
        text: 'Tough but so worth it! Just finished a 20-mile run this morning. The mental game is harder than the physical sometimes',
        timestamp: '2025-09-26T08:30:00Z',
        senderId: 'usr_9s2t5u8v',
        isRead: true
      },
      {
        id: 'msg_5c6d7e',
        text: '20 miles?! 😱 I can barely run 3! Any advice for someone just starting to run?',
        timestamp: '2025-09-26T09:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_6f7g8h',
        text: 'Haha everyone starts somewhere! The key is consistency and patience. Start with walk-run intervals 🏃‍♀️',
        timestamp: '2025-09-26T09:30:00Z',
        senderId: 'usr_9s2t5u8v',
        isRead: true
      },
      {
        id: 'msg_7g8h9i',
        text: 'Walk-run intervals sound doable! How long should I start with?',
        timestamp: '2025-09-26T10:00:00Z',
        senderId: 'user',
        isRead: false
      }
    ]
  },
  {
    id: 'usr_5a8b1c4d',
    name: 'Xara Woods',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=400&h=400&fit=crop&crop=face',
    bio: 'Meteorologist and storm chaser. Predicting weather and chasing adventures across the country. Fascinated by nature\'s power and always ready for the next journey! ⛈️🌪️',
    isMatched: true,
    conversations: [
      {
        id: 'msg_7i8j9k',
        text: 'Storm chasing sounds both terrifying and amazing! What\'s the most intense storm you\'ve witnessed?',
        timestamp: '2025-09-25T21:00:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_8l9m0n',
        text: 'EF4 tornado in Oklahoma last year! The power of nature is absolutely incredible. Scary but beautiful in its own way ⛈️',
        timestamp: '2025-09-25T22:15:00Z',
        senderId: 'usr_5a8b1c4d',
        isRead: true
      },
      {
        id: 'msg_9o0p1q',
        text: 'Wow! Do you ever get scared out there?',
        timestamp: '2025-09-25T22:30:00Z',
        senderId: 'user',
        isRead: true
      },
      {
        id: 'msg_0r1s2t',
        text: 'Absolutely! Healthy fear keeps you safe. But the adrenaline and scientific curiosity always win 😅',
        timestamp: '2025-09-26T07:00:00Z',
        senderId: 'usr_5a8b1c4d',
        isRead: false
      }
    ]
  }
];

export const users: User[] = datingAppData;

export const chats: Chat[] = datingAppData
  .filter(user => user.isMatched && user.conversations.length > 0)
  .map(user => ({
    id: user.id,
    user: user,
    messages: user.conversations,
    lastMessage: user.conversations[user.conversations.length - 1]
  }));