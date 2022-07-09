var WORDS = [
	"animal|ant",
	"hewan|semut",
	"animal|bat",
	"hewan|kelelawar",
	"animal|bear",
	"hewan|beruang",
	"animal|bee",
	"hewan|lebah",
	"animal|bird",
	"hewan|burung",
	"animal|bull",
	"hewan|banteng",
	"animal|buffalo",
	"hewan|kerbau",
	"animal|camel",
	"hewan|unta",
	"animal|cat",
	"hewan|kucing",
	"animal|cheetah",
	"hewan|cheetah",
	"animal|chicken",
	"hewan|ayam",
	"animal|chimpanzee",
	"hewan|simpanse",
	"animal|crocodile",
	"hewan|buaya",
	"animal|deer",
	"hewan|rusa",
	"animal|dog",
	"hewan|anjing",
	"animal|dolphin",
	"hewan|lumba-lumba",
	"animal|donkey",
	"hewan|keledai",
	"animal|dove",
	"hewan|burung merpati",
	"animal|dragonfly",
	"hewan|capung",
	"animal|duck",
	"hewan|bebek",
	"animal|eagle",
	"hewan|elang",
	"animal|elephant",
	"hewan|gajah",
	"animal|fish",
	"hewan|ikan",
	"animal|flamingo",
	"hewan|flamingo",
	"animal|fly",
	"hewan|lalat",
	"animal|fox",
	"hewan|rubah  ",
	"animal|frog",
	"hewan|katak ",
	"animal|giraffe",
	"hewan|jerapah",
	"animal|goat",
	"hewan|kambing ",
	"animal|goldfish",
	"hewan|ikan mas ",
	"animal|hippopotamus",
	"hewan|kuda nil",
	"animal|horse",
	"hewan|kuda ",
	"animal|jellyfish",
	"hewan|ubur-ubur ",
	"animal|kangaroo",
	"hewan|kangguru ",
	"animal|kitten",
	"hewan|kucing kecil",
	"animal|lion",
	"hewan|singa",
	"animal|lobster",
	"hewan|lobster",
	"animal|monkey",
	"hewan|monyet",
	"animal|octopus",
	"hewan|gurita",
	"animal|owl",
	"hewan|burung hantu",
	"animal|panda",
	"hewan|panda",
	"animal|pelican",
	"hewan|pelikan",
	"animal|rabbit",
	"hewan|kelinci",
	"animal|rat",
	"hewan|tikus",
	"animal|scorpion",
	"hewan|kalajengking",
	"animal|seal",
	"hewan|anjing laut",
	"animal|shark",
	"hewan|hiu",
	"animal|sheep",
	"hewan|domba",
	"animal|snail",
	"hewan|siput",
	"animal|snake",
	"hewan|ular",
	"animal|spider",
	"hewan|laba-laba",
	"animal|swan",
	"hewan|angsa",
	"animal|squirrel",
	"hewan|tupai",
	"animal|tiger",
	"hewan|macan",
	"animal|turtle",
	"hewan|penyu",
	"animal|whale",
	"hewan|paus",
	"animal|wolf",
	"hewan|serigala",
	"animal|worm",
	"hewan|cacing ",
	"animal|zebra",
	"hewan|zebra",
	"fruit|apple",
	"buah|apel",
	"fruit|pineapple",
	"buah|nanas",
	"fruit|mango",
	"buah|mangga",
	"fruit|guava",
	"buah|jambu biji",
	"fruit|pomegranate",
	"buah|delima",
	"fruit|banana",
	"buah|pisang",
	"fruit|watermelon",
	"buah|semangka",
	"fruit|dragon fruit",
	"buah|buah naga",
	"fruit|avocado",
	"buah|alpukat",
	"fruit|strawberry",
	"buah|strawberry",
	"fruit|blueberry",
	"fruit|blackberry",
	"fruit|blackcurrant",
	"fruit|raspberry",
	"buah|frambos",
	"buah|rasberi",
	"fruit|cranberry",
	"fruit|cloudberry",
	"fruit|mulberry",
	"buah|murbei",
	"fruit|goji berry",
	"fruit|acai berry",
	"fruit|huckleberry",
	"fruit|lingonberry",
	"fruit|buni",
	"fruit|cempedak",
	"buah|cempedak",
	"fruit|physalis",
	"buah|ciplukan",
	"fruit|gandaria",
	"buah|gandaria",
	"buah|jatake",
	"buah|marian plum",
	"fruit|gowok",
	"buah|gowok",
	"fruit|jamblang",
	"buah|jamblang",
	"buah|jambu keling",
	"buah|duwet",
	"fruit|keledang",
	"fruit|kelubi",
	"fruit|mentawa",
	"fruit|karusung",
	"fruit|kemang",
	"fruit|kemayau",
	"fruit|kemunting",
	"fruit|lahung",
	"fruit|lai",
	"fruit|batoko plum",
	"buah|lobi-lobi",
	"fruit|manau",
	"fruit|matoa",
	"buah|matoa",
	"fruit|mundu",
	"buah|mundu",
	"fruit|rukem",
	"buah|rukem",
	"fruit|rumbia",
	"buah|rumbia",
	"fruit|rambusa",
	"buah|rambusa",
	"fruit|dewandaru",
	"buah|dewandaru",
	"fruit|bisbul",
	"buah|bisbul",
	"fruit|kepel",
	"buah|kepel",
	"fruit|cucumber",
	"buah|mentimun",
	"fruit|paprica",
	"buah|paprika",
	"fruit|peas",
	"buah|kacang polong",
	"fruit|eggplant",
	"buah|terung",
	"fruit|hazelnut",
	"buah|kemiri",
	"fruit|walnut",
	"buah|kenari",
	"fruit|zucchini",
	"buah|mentimun jepang",
	"fruit|orange",
	"buah|jeruk",
	"fruit|satsuma",
	"buah|jeruk satsuma",
	"fruit|yuzu",
	"buah|jeruk yuzu",
	"fruit|ugli",
	"fruit|tangerine",
	"buah|jeruk keprok",
	"buah|jeruk medan",
	"fruit|clementine",
	"buah|jeruk clementine ",
	"fruit|lime",
	"buah|jeruk nipis",
	"buah|jeruk limau",
	"fruit|lemon",
	"buah|jeruk lemon",
	"fruit|kaffir lime",
	"fruit|makrut lime",
	"buah|jeruk purut",
	"fruit|pomelo",
	"buah|jeruk bali",
	"fruit|mandarin orange",
	"buah|jeruk mandarin",
	"fruit|star",
	"buah|belimbing",
	"fruit|grape",
	"buah|anggur",
	"fruit|tamarind",
	"buah|asam",
	"fruit|cantaloupe",
	"buah|blewah",
	"fruit|cermai",
	"buah|cermai",
	"fruit|duku",
	"buah|duku",
	"fruit|durian",
	"buah|durian",
	"fruit|water apple",
	"buah|jambu air",
	"fruit|malay apple",
	"buah|jambu bol",
	"fruit|cashew",
	"buah|jambu mede",
	"fruit|kawista",
	"buah|kawista",
	"fruit|maja",
	"fruit|ambarella",
	"buah|kedondong",
	"fruit|coconut",
	"buah|kelapa",
	"fruit|longan",
	"fruit|litchi",
	"buah|kelengkeng",
	"fruit|cherry",
	"buah|kersen",
	"fruit|kokosan",
	"buah|kokosan",
	"fruit|mango",
	"buah|mangga",
	"fruit|lychee",
	"buah|leci",
	"fruit|mangosteen",
	"buah|manggis",
	"fruit|passion",
	"buah|markisa",
	"fruit|melon",
	"buah|melon",
	"fruit|noni",
	"buah|mengkudu",
	"buah|pace",
	"fruit|namnam",
	"buah|sawo pancukan",
	"fruit|jackfruit",
	"buah|nangka",
	"fruit|papaya",
	"buah|pepaya",
	"fruit|rambutan",
	"buah|rambutan",
	"fruit|snake",
	"buah|salak",
	"fruit|sapodilla",
	"fruit|chico",
	"buah|sawo manila",
	"fruit|caqui",
	"buah|manilkara",
	"buah|sawo kecik",
	"fruit|soursop",
	"buah|sirsak",
	"fruit|sugar-apple",
	"buah|srikaya",
	"fruit|tomato",
	"buah|tomat",
	"fruit|olive",
	"buah|zaitun",
	"fruit|bilimbi",
	"fruit|cucumber tree",
	"fruit|tree sorrel",
	"buah|belimbing wuluh",
	"fruit|apricot",
	"buah|aprikot",
	"fruit|breadfruit",
	"buah|sukun",
	"fruit|cherry",
	"buah|ceri",
	"fruit|date",
	"buah|kurma",
	"fruit|fig",
	"buah|tin",
	"fruit|jicama",
	"buah|bengkoang",
	"fruit|jujube",
	"buah|kurma merah",
	"buah|kurma cina",
	"fruit|kiwi",
	"buah|kiwi",
	"fruit|loquat",
	"buah|biwa",
	"fruit|peach",
	"buah|persik",
	"fruit|persimmon",
	"buah|kesemek",
	"fruit|pear",
	"buah|pir",
	"fruit|plum",
	"buah|prem",
	"fruit|rose apple",
	"buah|jambu mawar",
	"fruit|honeydew",
	"buah|melon madu",
	"fruit|egg",
	"buah|sawo mentega",
	"buah|sawo ubi",
	"buah|alkesah",
	"buah|sawo belanda",
	"buah|kanistel",
	"fruit|palm",
	"buah|buah sawit",
	"fruit|beet",
	"buah|bit",
	"fruit|cocoa",
	"buah|coklat",
	"fruit|carica",
	"buah|carica",
	"fruit|enau",
	"buah|aren",
	"fruit|rbis",
	"buah|markisa jumbo",
	"fruit| feijoa",
	"buah|jambu nanas",
	"fruit|raisin",
	"buah|kismis",
	"fruit|lyre",
	"buah|kecapi",
	"fruit|saipan mango",
	"buah|mangga saipan",
	"fruit|pumpkin",
	"buah|labu",
	"fruit|plantain",
	"buah|pisang raja",
	"fruit|red banana",
	"buah|pisang merah",
	"fruit|vanilla",
	"buah|vanili",
	"fruit|peruvian groundcherry",
	"buah|ciplukan badak",
	"fruit|prune",
	"buah|plum kering",
	"fruit|almond",
	"buah|almond",
	"fruit|nectarine",
	"buah|nektarin",
	"fruit|quince",
	"buah|kwinsi",
	"fruit|surinam cherry",
	"buah|ceri suriname",
	"fruit|pluot",
	"fruit|japanese plum",
	"buah|prem jepang",
	"fruit|jaboticaba",
	"buah|anggur batang",
	"fruit|crab apple",
	"buah|apel mawar",
	"buah|malus",
	"fruit|bidara",
	"buah|bidara",
	"sport|swimming",
	"sport|footbal",
	"sport|basketball",
	"sport|badminton",
	"sport|baseball",
	"sport|bowling",
	"sport|karate",
	"sport|marathon",
	"sport|wrestling",
	"sport|surfing",
	"minuman|juice",
	"minuman|ice cream",
	"minuman|sop buah",
	"makanan|salad",
	"makanan|rujak buah",
	"makanan|puding",
	"cemilan|keripik",
	"cemilan|gorengan",
	"cemilan|kacang",
	"cemilan|tempe kering"
]