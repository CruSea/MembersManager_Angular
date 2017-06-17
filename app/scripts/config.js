/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise("/admin_login");

    $stateProvider

        // Admin Login Pages
        .state('admin_login', {
            url: "/admin_login",
            templateUrl: "views/AdminLogin/AdminLogin.html",
            controller: 'AdminLogInCtrl',
            data: { pageTitle: 'Log in', specialClass: 'gray-bg' }
        })
        .state('admin_register', {
            url: "/admin_register",
            templateUrl: "views/AdminLogin/AdminRegister.html",
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


        // Admin Page
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
            controller: 'DashboardCtrl'
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/Dashboard/Dashboard.html",
            controller: 'DashboardCtrl',
            data: { pageTitle: 'Example view' }
        })


        /* SMS Messages */
        .state('message', {
            abstract: true,
            url: "/message",
            templateUrl: "views/common/content.html",
            controller: 'DashboardCtrl'
        })
        .state('message.group_message', {
            url: "/GroupMessages",
            templateUrl: "views/Messages/GroupMessages.html",
            controller: 'GroupedMessagesCtrl',
            data: { pageTitle: 'Group Messages' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/iCheck/custom.css','scripts/js/plugins/iCheck/icheck.min.js','scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        }
                    ]);
                }
            }
        })
        .state('message.sent_message', {
            url: "/SentMessages",
            templateUrl: "views/Messages/SentMessages.html",
            controller: 'SentMessagesCtrl',
            data: { pageTitle: 'SMS Sent' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/iCheck/custom.css','scripts/js/plugins/iCheck/icheck.min.js','scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['scripts/js/plugins/toastr/toastr.min.js', 'scripts/css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('message.received_message', {
            url: "/ReceivedMessages",
            templateUrl: "views/Messages/ReceivedMessages.html",
            controller: 'ReceivedMessagesCtrl',
            data: { pageTitle: 'SMS Received' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/iCheck/custom.css','scripts/js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })

        /* IMS Contacts */
        .state('contact', {
            abstract: true,
            url: "/Contacts",
            templateUrl: "views/common/content.html",
            controller: 'DashboardCtrl'
        })
        .state('contact.contacts', {
            url: "/Contacts",
            templateUrl: "views/Contacts/ContactList.html",
            controller: 'RegisteredContactsCtrl',
            data: { pageTitle: 'Contact List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            serie: true,
                            files: ['scripts/js/plugins/dataTables/datatables.min.js','scripts/css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['scripts/js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['scripts/js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('contact.groups', {
            url: "/groups",
            templateUrl: "views/Contacts/ContactGroups.html",
            controller: 'GroupedContactCtrl',
            data: { pageTitle: 'Contact Groups' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/switchery/switchery.css','scripts/js/plugins/switchery/switchery.js','scripts/js/plugins/switchery/ng-switchery.js', 'scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            files: ['scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            serie: true,
                            files: ['scripts/js/plugins/dataTables/datatables.min.js','scripts/css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['scripts/js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['scripts/js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('contact.detail', {
            url: "/detail",
            templateUrl: "views/Contacts/ContactGroupDetail.html",
            controller: 'ContactGroupCtrl',
            data: { pageTitle: 'Group Detail' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/switchery/switchery.css','scripts/js/plugins/switchery/switchery.js','scripts/js/plugins/switchery/ng-switchery.js', 'scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        }
                    ]);
                }
            }
        })

        /* Settings */
        .state('settings', {
            abstract: true,
            url: "/Settings",
            templateUrl: "views/common/content.html",
            controller: 'DashboardCtrl'
        })
        .state('settings.users', {
            url: "/Users",
            templateUrl: "views/Settings/UsersList.html",
            controller: 'SettingsCtrl',
            data: { pageTitle: 'Users' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/switchery/switchery.css','scripts/js/plugins/switchery/switchery.js','scripts/js/plugins/switchery/ng-switchery.js', 'scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        }
                    ]);
                }
            }
        })
        .state('settings.profile', {
            url: "/Profile",
            templateUrl: "views/Settings/Profile.html",
            controller: 'SettingsCtrl',
            data: { pageTitle: 'Users' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['scripts/css/plugins/switchery/switchery.css','scripts/js/plugins/switchery/switchery.js','scripts/js/plugins/switchery/ng-switchery.js', 'scripts/js/plugins/jasny/jasny-bootstrap.min.js']
                        }
                    ]);
                }
            }
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
