/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise("/partners");

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })

        // Admin Login Pages
        .state('admin_login', {
            url: "/admin_login",
            templateUrl: "views/AdminLogin/AdminLogin.html",
            controller: 'AdminLogInCtrl',
            data: { pageTitle: 'Log in', specialClass: 'gray-bg' }
        })


        // Partners Pages
        .state('partners', {
            url: "/partners",
            templateUrl: "views/PartnersPage/PartnersPage.html",
            controller: 'PartnersPageCtrl',
            data: { pageTitle: 'Log in', specialClass: 'gray-bg' }
        })

        $translateProvider
        .translations('en', {

            // Define all menu elements
            HOME: 'Home ',
            DASHBOARD: 'Dashboard ',
            FEATURES: 'Features ',
            TEAM: 'Team',
            PRICING: 'Pricing',
            CONTACT: 'Contact',
            Language: 'Language',
            NEGARITSMS: 'Go to Dashboard',
            LOGINWELCOME: 'Welcome to Dashboard',
            NEGARITSHORTSUMMARY: 'Thank you for choosing Negarit',
            USEREMAIL: 'Username',
            USERPASSWORD: 'Password',
            LOGIN: 'Log In',
            FORGETPASSWORD: 'Forgot password',
            DOWNTHAVEACCOUNT: 'Do not have an account',
            CREATENEWACCOUNT: 'Create an account',
            NEGARIT: 'Dashboard SMS',
            NEGARITSENT: 'Sent Messages',
            NEGARITRECEIVED: 'Received Messages',
            NEGARITPENDING: 'Pending Messages',
            NEGARITDASHBOARD_SUB: 'Dashboard',
            NEGARIT_MESSAGES: 'All Messages',
            NEGARITSMS_MENU: 'Dashboard SMS',
            ANIMATIONS: 'Animations',
            LANDING: 'Landing page',
            LAYOUTS: 'Layouts',
            GroupMessages:'Group Messages',
            SMSMessages: 'SMS Messages',
            SentMessages: 'Sent Messages',
            SMSCompose: 'Compose Message',
            SMSSent: 'Sent Messages',
            SMSReceived: 'Received Messages',
            SMSPort: 'SMS Port',
            CompanyProfile: 'Company Profile',
            RESETCODE: 'Get A Reset Code',
            RESETPASSWORD: 'Reset Password',

            // Define some custom text
            WELCOME: 'Welcome Amelia',
            MESSAGEINFO: 'You have 42 messages and 6 notifications.',
            SEARCH: 'Search for something...',
            DEMO: 'Internationalization (sometimes shortened to \"I18N , meaning \"I - eighteen letters -N\") is the process of planning and implementing products and services so that they can easily be adapted to specific local languages and cultures, a process called localization . The internationalization process is sometimes called translation or localization enablement .'

        })
        .translations('am', {

            // Define all menu elements
            HOME: 'ነጋሪት ',
            FEATURES: 'አይነት ',
            DASHBOARD: 'ገበታ ',
            TEAM: 'ቡድን ',
            PRICING: 'የአከፋፈል ሁኔታ',
            CONTACT: 'አድራሻ',
            LANGUAGE: 'ቛንቛ',
            NEGARITSMS: 'ወደ ነጋሪት የአጭር ጽሁፍ መልዕክት',
            WELCOMETONEGARIT: 'እንኳን ወደ ነጋሪት መጡ',
            LOGINWELCOME: 'እንኳን ወደ ነጋሪት መጡ',
            NEGARITSHORTSUMMARY: 'ነጋሪት የእርስዋ የመጀመሪያ ምርጫ ስለሆነ እናመሰግናለን።',
            USEREMAIL: 'የመጠቀሚያ ስም ',
            USERPASSWORD: 'የይለፍ ቃል ',
            LOGIN: 'ይግቡ',
            FORGETPASSWORD: 'የይለፍ ቃሎን ዘነጉት',
            DOWNTHAVEACCOUNT: 'ከዚህ ቀደም አልተመዘገቡም ',
            CREATENEWACCOUNT: 'እንደ አዲስ ይመዝገቡ',
            NEGARIT: 'የነጋሪት መልዕክት ',
            NEGARITSENT: 'የተላኩ መልዕክቶች ',
            NEGARITRECEIVED: 'የገቡ መልዕክቶች ',
            NEGARITPENDING: 'በመጠባበቅ ላይ ያሉ መልዕክቶች ',
            UIELEMENTS: 'UI elements',
            MISCELLANEOUS: 'ተጨማሪዎ',
            GRIDOPTIONS: 'Cuadrícula',
            TABLES: 'Tablas',
            COMMERCE: 'E-comercio',
            GALLERY: 'Galería',
            MENULEVELS: 'Niveles de menú',
            ANIMATIONS: 'Animaciones',
            LANDING: 'Página de destino',
            LAYOUTS: 'Esquemas',
            GroupMessages:'የደቦ መልዕክቶች',
            SMSMessages: 'አጭር መልዕክቶች ',
            SentMessages: 'የተላኩ መልዕክቶች ',
            SMSCompose: 'መልዕክት ማቀናበሪያ ',
            SMSSent: 'የተላኩ መልዕክቶች ',
            SMSReceived: 'የደረሱ መልዕክቶች ',
            SMSCampaigns: 'የመልዕክት ክውነቶች ',
            Settings: 'ቅንብሮች  ',
            SMSPort: 'የመልዕክት መውጫ ',
            CompanyProfile: 'የድርጅት ገጽ',

            // Define some custom text
            WELCOME: 'Bienvenido Amelia',
            MESSAGEINFO: 'Usted tiene 42 mensajes y 6 notificaciones.',
            SEARCH: 'Busca algo ...',
            DEMO: 'Internacionalización (a veces abreviado como \"I18N, que significa\" I - dieciocho letras N \") es el proceso de planificación e implementación de productos y servicios de manera que se pueden adaptar fácilmente a las lenguas y culturas locales específicas, un proceso llamado localización El proceso de internacionalización. a veces se llama la traducción o la habilitación de localización.'
        });


    $translateProvider.preferredLanguage('en');

}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
