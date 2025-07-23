// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const year = new Date().getFullYear();
const resources = {
    en: {
        translation: {
            // App metadata
            appName: "Iaas-Firecracker",
            appTitle: "Iaas-Firecracker",

            // Navigation
            navigation: {
                home: "Home",
                dashboard: "Dashboard",
                compute: "Compute",
                storage: "Storage",
                networking: "Networking",
                security: "Security",
                admin: "Admin",
                profile: "Profile",
                settings: "Settings",
                logout: "Logout",
                login: "Login",
                register: "Register"
            },

            // Landing Page
            landing: {
                hero: {
                    title: "Cloud Hosting",
                    highlight: "Reimagined",
                    subtitle: "Enterprise-grade infrastructure at startup-friendly prices. Deploy in seconds, scale without limits.",
                    ctaPrimary: "Launch Your First VM",
                    ctaSecondary: "Compare Plans"
                },
                trust: {
                    uptime: "99.99% Uptime",
                    support: "24/7 Support",
                    global: "Global Network",
                    security: "Enterprise Security"
                },
                industries: {
                    title: "Solutions For Every Industry",
                    enterprise: "Enterprise",
                    enterpriseDesc: "Secure and scalable infrastructure for large corporations",
                    startups: "Startups",
                    startupsDesc: "Cost-effective solutions to help your business grow",
                    education: "Education",
                    educationDesc: "Special packages for educational institutions",
                    healthcare: "Healthcare",
                    healthcareDesc: "HIPAA-compliant hosting for medical applications",
                    developers: "Developers",
                    developersDesc: "Developer-friendly tools and APIs",
                    gaming: "Gaming",
                    gamingDesc: "Low-latency solutions for game servers"
                },
                howItWorks: {
                    title: "How It Works",
                    subtitle: "Get your cloud infrastructure up and running in minutes",
                    step1: "Sign Up",
                    step1Desc: "Create your account in less than 60 seconds",
                    step2: "Configure",
                    step2Desc: "Choose your VM specifications and options",
                    step3: "Deploy",
                    step3Desc: "Launch your VM with a single click",
                    step4: "Scale",
                    step4Desc: "Upgrade resources as your needs grow"
                },
                cta: {
                    title: "Ready to Deploy Your Project?",
                    subtitle: "Get started in minutes with our easy-to-use platform. No long-term contracts, cancel anytime.",
                    button: "Start Free Trial"
                }
            },

            // Features Component
            features: {
                title: "Why Choose Our Cloud Platform",
                performance: {
                    title: "High Performance",
                    description: "Our NVMe SSD storage and high-frequency CPUs deliver exceptional performance for your applications."
                },
                security: {
                    title: "Enterprise Security",
                    description: "Multiple layers of security including DDoS protection, firewalls, and isolated networks."
                },
                scalability: {
                    title: "Scalable Resources",
                    description: "Easily upgrade your resources as your needs grow without any downtime."
                },
                global: {
                    title: "Global Data Centers",
                    description: "Choose from multiple locations worldwide to reduce latency for your users."
                },
                access: {
                    title: "Full Root Access",
                    description: "Complete control over your virtual machines with full root/administrator access."
                },
                support: {
                    title: "24/7 Support",
                    description: "Our expert support team is available around the clock to assist you."
                }
            },

            // Pricing Component
            pricing: {
                title: "Simple, Transparent Pricing",
                subtitle: "No hidden fees. No surprises. Pay only for what you use.",
                popular: "MOST POPULAR",
                cta: "Get Started",
                starter: {
                    name: "Starter",
                    price: "$4.99",
                    period: "/month",
                    spec1: "1 vCPU Core",
                    spec2: "4GB RAM",
                    spec3: "50GB NVMe SSD",
                    spec4: "1TB Bandwidth",
                    spec5: "1 IPv4 Address"
                },
                business: {
                    name: "Business",
                    price: "$9.99",
                    period: "/month",
                    spec1: "4 vCPU Cores",
                    spec2: "8GB RAM",
                    spec3: "100GB NVMe SSD",
                    spec4: "2TB Bandwidth",
                    spec5: "1 IPv4 Address"
                },
                enterprise: {
                    name: "Enterprise",
                    price: "$19.99",
                    period: "/month",
                    spec1: "8 vCPU Cores",
                    spec2: "16GB RAM",
                    spec3: "200GB NVMe SSD",
                    spec4: "4TB Bandwidth",
                    spec5: "2 IPv4 Addresses"
                }
            },

            // Testimonials Component
            testimonials: {
                title: "What Our Customers Say",
                testimonial1: {
                    name: "Sarah Johnson",
                    role: "CTO at TechStart",
                    quote: "We've reduced our infrastructure costs by 60% while improving performance significantly. The support team is exceptional.",
                    avatar: "SJ"
                },
                testimonial2: {
                    name: "Michael Chen",
                    role: "DevOps Engineer",
                    quote: "The API and control panel make automation a breeze. We've deployed dozens of instances with zero issues.",
                    avatar: "MC"
                },
                testimonial3: {
                    name: "Emma Rodriguez",
                    role: "Founder of AppVenture",
                    quote: "As a startup, the affordable pricing with enterprise-grade features was exactly what we needed to scale.",
                    avatar: "ER"
                }
            },

            // Common UI Elements
            common: {
                language: "Language",
                viewAll: "View All",
                learnMore: "Learn More",
                contactSales: "Contact Sales",
                search: "Search...",
                emailPlaceholder: "Your email address",
                subscribe: "Subscribe",
                privacyPolicy: "Privacy Policy",
                termsOfService: "Terms of Service",
                cookiePolicy: "Cookie Policy",
                allRightsReserved: "All rights reserved"
            },

            login: {
                title: "Welcome Back",
                subtitle: "Please sign in to your account to continue",
                registrationSuccess: "Registration successful! Please sign in with your credentials.",
                form: {
                    email: {
                        label: "Email Address"
                    },
                    password: {
                        label: "Password",
                        toggleVisibility: "Toggle password visibility"
                    },
                    rememberMe: "Remember me",
                    forgotPassword: "Forgot password?",
                    submitButton: "Sign In",
                    noAccount: "Don't have an account?",
                    signUpLink: "Sign up"
                },
                socialLogin: {
                    divider: "OR CONTINUE WITH"
                },
                success: {
                    title: "Login Successful!",
                    message: "You have been successfully logged in to your account.",
                    goToDashboard: "Go to Dashboard"
                }
            },
            validation: {
                email: {
                    required: "Email is required",
                    invalid: "Please enter a valid email address"
                },
                password: {
                    required: "Password is required",
                    minLength: "Password must be at least 6 characters long"
                }
            },
            errors: {
                loginFailed: "An error occurred during login. Please try again later.",
                invalidCredentials: "Invalid email or password. Please try again."
            },

            auth: {
                signup: {
                    title: "Create Your Account",
                    subtitle: "Fill out the form below to get started",
                    button: "Create Account",
                    hasAccount: "Already have an account?",
                    signInLink: "Sign in",
                    success: {
                        title: "Sign Up Successful!",
                        message: "Your account has been created successfully. Please check your email to verify your account.",
                        loginButton: "Go to Login"
                    }
                },
                fields: {
                    fullName: "Full Name",
                    email: "Email Address",
                    password: "Password",
                    confirmPassword: "Confirm Password"
                },
                password: {
                    strengthLabel: "Password strength",
                    strength: {
                        veryWeak: "Very weak",
                        weak: "Weak",
                        medium: "Medium",
                        strong: "Strong",
                        veryStrong: "Very strong"
                    }
                },
                errors: {
                    nameRequired: "Name is required",
                    emailRequired: "Email is required",
                    emailInvalid: "Please enter a valid email address",
                    passwordRequired: "Password is required",
                    passwordMinLength: "Password must be at least 8 characters",
                    passwordWeak: "Password is too weak",
                    confirmPasswordRequired: "Please confirm your password",
                    passwordMismatch: "Passwords don't match",
                    termsRequired: "You must agree to the Terms of Service"
                },
                agreeToTerms: {
                    text: "I agree to the",
                    terms: "Terms of Service",
                    and: "and",
                    privacy: "Privacy Policy"
                },
                orContinueWith: "OR CONTINUE WITH",
                togglePassword: "toggle password visibility"
            },
            // Status indicators
            status: {
                operational: "All Systems Operational",
                maintenance: "Maintenance in Progress",
                incident: "Service Incident"
            },

            // Compute Resources
            compute: {
                virtualMachines: "Virtual Machines",
                containers: "Containers",
                serverless: "Serverless",
                vCPU: "vCPU Cores",
                memory: "Memory",
                storage: "Storage"
            },

            // Storage Types
            storageTypes: {
                block: "Block Storage",
                object: "Object Storage",
                file: "File Storage"
            },

            // Networking
            networking: {
                loadBalancers: "Load Balancers",
                dns: "DNS",
                firewall: "Firewall",
                vpn: "VPN"
            },

            back: 'Back',
            next: 'Next',
            cancel: 'Cancel',
            submit: 'Submit',
            requiredField: 'This field is required',
            loading: 'Loading...',

            // Page Titles
            findSuitableHost: 'Find Suitable Host',
            findSuitableHostDescription: 'This utility will help you find the best cluster for your virtual machine based on resource requirements.',

            // Steps
            specifyRequirements: 'Specify Requirements',
            reviewSelection: 'Review Selection',
            vmCreation: 'VM Creation',

            // Step Descriptions
            specifyRequirementsDesc: 'Define the CPU, memory and storage requirements for your virtual machine.',
            reviewSelectionDesc: 'Review the selected host before proceeding with VM creation.',
            vmCreationDesc: 'Virtual machine creation in progress.',

            // Resource Form
            vmName: 'VM Name',
            vmNameHelper: 'Enter a name for your virtual machine',
            cpuCores: 'CPU Cores',
            cpuCoresHelper: 'Number of virtual CPU cores required',
            memory: 'Memory',
            memoryHelper: 'Memory allocation in MiB (1024 MiB = 1 GB)',
            storage: 'Storage',
            storageHelper: 'Disk space allocation in GB',
            osType: 'Operating System',
            osTypeHelper: 'Select the operating system for your VM',
            rootPassword: 'Root Password',
            rootPasswordHelper: 'Set the root/administrator password',

            // Host Selection
            selectedHost: 'Selected Host',
            hostCluster: 'Host Cluster',
            hostResources: 'Host Resources',
            availableCpu: 'Available CPU',
            availableMemory: 'Available Memory',
            availableStorage: 'Available Storage',

            // Status Messages
            searchingHost: 'Searching for suitable host...',
            hostFound: 'Suitable host found!',
            noHostFound: 'No suitable host found. Please adjust your requirements.',
            creatingVm: 'Creating virtual machine...',
            vmCreatedSuccess: 'Virtual machine created successfully!',
            vmCreateError: 'Failed to create virtual machine',

            // Actions
            findHost: 'Find Host',
            createVm: 'Create VM',
            createAnother: 'Create Another VM',
            viewDetails: 'View Details',

            // Results
            vmDetails: 'VM Details',
            vmName: 'Name',
            vmStatus: 'Status',
            vmHost: 'Host',
            vmIp: 'IP Address',
            vmCreatedAt: 'Created At'
            ,
            // VM Offer Types
            vmOfferMicro: "Micro",
            vmOfferSmall: "Small",
            vmOfferMedium: "Medium",
            vmOfferLarge: "Large",
            vmOfferCustom: "Custom",

            // Status Messages
            vmStatusRunning: "Running",
            vmStatusStopped: "Stopped",
            vmStatusError: "Error",
            vmStatusCreating: "Creating",

            // Resource Units
            unitCpuCores: "CPU cores",
            unitMemoryGB: "GB RAM",
            unitStorageGB: "GB Storage",

            // OS Types
            osTypeLinux: "Linux",
            osTypeWindows: "Windows",

            // Validation Messages
            validationRequired: "This field is required",
            validationMinCpu: "Minimum 1 CPU core required",
            validationMinMemory: "Minimum 512 MiB memory required",
            validationMinStorage: "Minimum 10 GB storage required",
            validationPasswordLength: "Password must be at least 8 characters",
            cluster: {
                management: "Cluster Management",
                addCluster: "Add Cluster",
                editCluster: "Edit Cluster",
                confirmDelete: "Are you sure you want to delete this cluster?",
                noClusters: "No clusters found. Click 'Add Cluster' to create one.",
                status: "Status",
                name: "Name",
                ipAddress: "IP Address",
                macAddress: "MAC Address",
                storage: "Storage",
                memory: "Memory",
                cpu: "CPU",
                processor: "Processor",
                totalStorage: "Total Storage (GB)",
                availableStorage: "Available Storage (GB)",
                totalRAM: "Total RAM (GB)",
                availableRAM: "Available RAM (GB)",
                cpuCores: "CPU Cores",
                availableCores: "Available CPU Cores",
                cores: "cores",
                statuses: {
                    healthy: "Healthy",
                    warning: "Warning",
                    critical: "Critical"
                },
                healthDataUnavailable: "Health check data not available",
                systemHealth: "System Health",
                service: "Service",
                message: "Message",
                noMessage: "No message available",
                systemInfoUnavailable: "System information not available",
                systemInformation: "System Information",
                version: "Version",
                uptime: "System Uptime",
                clusters: "Clusters",
                active: "active",
                total: "total",
                virtualMachines: "Virtual Machines",
                running: "running",
                storageUsage: "Storage Usage",
                memoryUsage: "Memory Usage",
                cpuUsage: "CPU Usage",
                usedOf: "used of",
                coresUsedOf: "cores used of",
                noAvailableClusters: "No available clusters found",
                availableClusters: "Available Clusters",
                clustersAvailable: "clusters available",
                clusterName: "Cluster Name",
                cpuAvailable: "CPU Available",
                ramAvailable: "RAM Available",
                storageAvailable: "Storage Available",
                clusterDetails: "Cluster Details",
                generalInformation: "General Information",
                clusterId: "Cluster ID",
                resourceAllocation: "Resource Allocation",
                memoryRAM: "Memory (RAM)",
                managementDashboard: "Cluster Management Dashboard"
            },
            common: {
                home: "Home",
                refresh: "Refresh",
                cancel: "Cancel",
                update: "Update",
                create: "Create",
                actions: "Actions",
                search: "Search",
                clear: "Clear",
                edit: "Edit",
                delete: "Delete",
                viewDetails: "View Details",
                close: "Close",
                refreshing: "Refreshing...",
                refreshData: "Refresh Data",
                lastUpdated: "Last updated"
            },
            systemImages: {
                title: "System Images",
                addImage: "Add Image",
                searchPlaceholder: "Search system images...",
                allImages: "All Images",
                linux: "Linux",
                windows: "Windows",
                otherOS: "Other OS",
                loading: "Loading system images...",
                noImagesFound: "No system images found",
                confirmDelete: "Are you sure you want to delete the system image \"{name}\"?",
                addTitle: "Add New System Image",
                editTitle: "Edit System Image",
                viewTitle: "System Image Details",
                version: "Version",
                noDescription: "No description available",
                osType: "OS Type",
                description: "Description",
                created: "Created",
                lastUpdated: "Last Updated",
                nameLabel: "Image Name",
                osTypeLabel: "OS Type",
                versionLabel: "Version",
                versionPlaceholder: "e.g., 22.04 LTS",
                descriptionLabel: "Description",
                descriptionPlaceholder: "Provide a detailed description of the system image",
                imagePreview: "System Image Preview",
                imageAlt: "System Image Preview",
                noImageAvailable: "No image available",
                uploadImage: "Upload Image"
            },
            clusterManagement: {
                title: "Cluster Management",
                subtitle: "Create, configure and manage your cluster instances",
                totalClusters: "Total Clusters: {count}",
                activeClusters: "Active Clusters",
                activeDescription: "Healthy and operational clusters",
                warningState: "Warning State",
                warningDescription: "Clusters with warnings",
                errorState: "Error State",
                errorDescription: "Clusters requiring attention",
                tabsAriaLabel: "Cluster management tabs",
                tabDashboard: "Dashboard",
                tabManageClusters: "Manage Clusters",
                tabFindHost: "Find Host",
                tabSystemImages: "System Images",
                helpTitle: "Need Help?",
                helpText: "Learn more about managing clusters in our <1>documentation</1> or <3>contact support</3> if you encounter any issues."
            },
            profile: {
                title: "User Profile",
                tabs: {
                    profile: "Profile",
                    edit: "Edit Profile",
                    password: "Change Password"
                },
                fields: {
                    name: "Name",
                    email: "Email",
                    currentPassword: "Current Password",
                    newPassword: "New Password"
                },
                buttons: {
                    update: "Update Profile",
                    changePassword: "Change Password",
                    delete: "Delete Profile"
                },
                messages: {
                    updateSuccess: "Profile updated successfully!",
                    passwordChangeSuccess: "Password changed successfully!",
                    deleteConfirm: "Are you sure you want to delete your profile? This action cannot be undone.",
                    deleteSuccess: "Profile deleted successfully!"
                }
            },
            resetPassword: {
                title: "Reset Password",
                steps: {
                    email: "Enter your email to receive a reset code",
                    code: "Check your email for the reset code and enter it below",
                    password: "Enter your new password to complete the reset"
                },
                buttons: {
                    sendCode: "Send Reset Code",
                    verifyCode: "Verify Code",
                    resetPassword: "Reset Password",
                    resendCode: "Resend Code"
                },
                messages: {
                    codeSent: "Reset code sent to your email",
                    codeVerified: "Code verified successfully",
                    passwordReset: "Password reset successfully"
                }
            },
            common: {
                errors: {
                    required: "This field is required",
                    emailInvalid: "Please enter a valid email address",
                    passwordMismatch: "Passwords don't match"
                }
            },
            userManagement: {
                title: "User Management",
                buttons: {
                    refresh: "Refresh",
                    createUser: "Create User",
                    edit: "Edit",
                    delete: "Delete",
                    resetPassword: "Reset Password",
                    viewDetails: "View Details",
                    saveChanges: "Save Changes",
                    cancel: "Cancel",
                    clearFilters: "Clear Filters"
                },
                filters: {
                    title: "Filters",
                    role: {
                        all: "All Roles",
                        admin: "Administrator",
                        user: "User"
                    },
                    status: {
                        all: "All Statuses",
                        active: "Active",
                        inactive: "Inactive"
                    }
                },
                table: {
                    headers: {
                        name: "Name",
                        email: "Email",
                        role: "Role",
                        status: "Status",
                        actions: "Actions"
                    },
                    noUsers: "No users found"
                },
                dialogs: {
                    createUser: {
                        title: "Create New User",
                        userType: "User Type",
                        regularUser: "Regular User",
                        administrator: "Administrator",
                        adminDescription: "Administrators have full access to manage all system resources and other users.",
                        userDescription: "Regular users have limited permissions based on their assigned resources.",
                        accountStatus: "Account Status",
                        statusHelper: "Active users can immediately login to the system"
                    },
                    editUser: {
                        title: "Edit User"
                    },
                    resetPassword: {
                        title: "Reset Password",
                        description: "Enter a new password for {name}"
                    },
                    deleteUser: {
                        title: "Confirm Deletion",
                        description: "Are you sure you want to delete the user {name}?",
                        warning: "This action cannot be undone. The user will be permanently removed from the system."
                    },
                    viewUser: {
                        title: "User Details",
                        userId: "User ID",
                        createdAt: "Created At",
                        lastUpdated: "Last Updated",
                        close: "Close"
                    }
                },
                messages: {
                    userCreated: "User created successfully!",
                    userUpdated: "User updated successfully!",
                    passwordReset: "Password reset successfully!",
                    userDeleted: "User deleted successfully!",
                    error: {
                        fetchUsers: "Failed to fetch users. Please try again.",
                        createUser: "Failed to create user. Please try again.",
                        updateUser: "Failed to update user. Please try again.",
                        resetPassword: "Failed to reset password. Please try again.",
                        deleteUser: "Failed to delete user. Please try again."
                    }
                }
            },

            // Add this to the en.translation object
            footer: {
                tagline: "Cloud Infrastructure as a Service",
                newsletter: "Newsletter",
                emailPlaceholder: "Your email address",
                followUs: "Follow Us",
                products: "Products",
                virtualMachines: "Virtual Machines",
                kubernetes: "Kubernetes",
                storage: "Storage",
                loadBalancers: "Load Balancers",
                backups: "Backups",
                resources: "Resources",
                documentation: "Documentation",
                apiReference: "API Reference",
                tutorials: "Tutorials",
                community: "Community",
                status: "Status",
                company: "Company",
                aboutUs: "About Us",
                careers: "Careers",
                contact: "Contact",
                blog: "Blog",
                press: "Press",
                legal: "Legal",
                termsOfService: "Terms of Service",
                privacyPolicy: "Privacy Policy",
                security: "Security",
                compliance: "Compliance",
                gdpr: "GDPR",
                copyright: `© ${year} Iaas-Firecracker. All rights reserved.`,
                subscribe: "Subscribe",
                cookiePolicy: "Cookie Policy"
            }
        }
    },
    fr: {
        translation: {
            // App metadata
            appName: "Iaas-Firecracker",
            appTitle: "Iaas-Firecracker",

            // Navigation
            navigation: {
                home: "Accueil",
                dashboard: "Tableau de bord",
                compute: "Calcul",
                storage: "Stockage",
                networking: "Réseau",
                security: "Sécurité",
                admin: "Administration",
                profile: "Profil",
                settings: "Paramètres",
                logout: "Déconnexion",
                login: "Connexion",
                register: "S'inscrire"
            },

            // Landing Page
            landing: {
                hero: {
                    title: "Hébergement Cloud",
                    highlight: "Réinventé",
                    subtitle: "Infrastructure professionnelle à des prix accessibles. Déployez en secondes, évoluez sans limites.",
                    ctaPrimary: "Lancer votre première VM",
                    ctaSecondary: "Comparer les offres"
                },
                trust: {
                    uptime: "99.99% Disponibilité",
                    support: "Support 24/7",
                    global: "Réseau Mondial",
                    security: "Sécurité Entreprise"
                },
                industries: {
                    title: "Solutions Pour Chaque Secteur",
                    enterprise: "Entreprise",
                    enterpriseDesc: "Infrastructure sécurisée et évolutive pour les grandes entreprises",
                    startups: "Startups",
                    startupsDesc: "Solutions économiques pour faire croître votre entreprise",
                    education: "Éducation",
                    educationDesc: "Offres spéciales pour les établissements éducatifs",
                    healthcare: "Santé",
                    healthcareDesc: "Hébergement conforme HIPAA pour applications médicales",
                    developers: "Développeurs",
                    developersDesc: "Outils et APIs adaptés aux développeurs",
                    gaming: "Jeux",
                    gamingDesc: "Solutions à faible latence pour serveurs de jeu"
                },
                howItWorks: {
                    title: "Comment ça marche",
                    subtitle: "Mettez en place votre infrastructure cloud en quelques minutes",
                    step1: "Inscription",
                    step1Desc: "Créez votre compte en moins de 60 secondes",
                    step2: "Configuration",
                    step2Desc: "Choisissez les spécifications de votre VM",
                    step3: "Déploiement",
                    step3Desc: "Lancez votre VM en un clic",
                    step4: "Évolution",
                    step4Desc: "Augmentez les ressources selon vos besoins"
                },
                cta: {
                    title: "Prêt à déployer votre projet?",
                    subtitle: "Commencez en quelques minutes avec notre plateforme intuitive. Sans engagement, résiliez à tout moment.",
                    button: "Essai Gratuit"
                }
            },

            // Features Component
            features: {
                title: "Pourquoi choisir notre plateforme cloud",
                performance: {
                    title: "Haute Performance",
                    description: "Nos stockages NVMe SSD et CPUs haute fréquence offrent des performances exceptionnelles."
                },
                security: {
                    title: "Sécurité Entreprise",
                    description: "Plusieurs couches de sécurité incluant protection DDoS, firewalls et réseaux isolés."
                },
                scalability: {
                    title: "Évolutivité",
                    description: "Augmentez facilement vos ressources sans interruption de service."
                },
                global: {
                    title: "Centres de Données Mondiaux",
                    description: "Plusieurs localisations disponibles pour réduire la latence."
                },
                access: {
                    title: "Accès Root Complet",
                    description: "Contrôle total sur vos machines virtuelles avec accès root/administrateur."
                },
                support: {
                    title: "Support 24/7",
                    description: "Notre équipe d'experts disponible à tout moment pour vous aider."
                }
            },

            // Pricing Component
            pricing: {
                title: "Tarification Simple et Transparente",
                subtitle: "Pas de frais cachés. Payez seulement ce que vous utilisez.",
                popular: "LE PLUS POPULAIRE",
                cta: "Commencer",
                starter: {
                    name: "Starter",
                    price: "4,99€",
                    period: "/mois",
                    spec1: "1 Cœur vCPU",
                    spec2: "4GB RAM",
                    spec3: "50GB SSD NVMe",
                    spec4: "1TB Bandwidth",
                    spec5: "1 Adresse IPv4"
                },
                business: {
                    name: "Business",
                    price: "9,99€",
                    period: "/mois",
                    spec1: "4 Cœurs vCPU",
                    spec2: "8GB RAM",
                    spec3: "100GB SSD NVMe",
                    spec4: "2TB Bandwidth",
                    spec5: "1 Adresse IPv4"
                },
                enterprise: {
                    name: "Enterprise",
                    price: "19,99€",
                    period: "/mois",
                    spec1: "8 Cœurs vCPU",
                    spec2: "16GB RAM",
                    spec3: "200GB SSD NVMe",
                    spec4: "4TB Bandwidth",
                    spec5: "2 Adresses IPv4"
                }
            },

            // Testimonials Component
            testimonials: {
                title: "Témoignages de nos clients",
                testimonial1: {
                    name: "Sarah Johnson",
                    role: "CTO chez TechStart",
                    quote: "Nous avons réduit nos coûts d'infrastructure de 60% tout en améliorant les performances. L'équipe support est exceptionnelle.",
                    avatar: "SJ"
                },
                testimonial2: {
                    name: "Michael Chen",
                    role: "Ingénieur DevOps",
                    quote: "L'API et le panneau de contrôle rendent l'automatisation très simple. Nous avons déployé des dizaines d'instances sans problème.",
                    avatar: "MC"
                },
                testimonial3: {
                    name: "Emma Rodriguez",
                    role: "Fondatrice d'AppVenture",
                    quote: "En tant que startup, le rapport qualité-prix avec des fonctionnalités professionnelles était exactement ce dont nous avions besoin.",
                    avatar: "ER"
                }
            },

            // Common UI Elements
            common: {
                language: "Langue",
                viewAll: "Voir tout",
                learnMore: "En savoir plus",
                contactSales: "Contact Commercial",
                search: "Rechercher...",
                emailPlaceholder: "Votre adresse email",
                subscribe: "S'abonner",
                privacyPolicy: "Politique de confidentialité",
                termsOfService: "Conditions d'utilisation",
                cookiePolicy: "Politique de cookies",
                allRightsReserved: "Tous droits réservés"
            },

            login: {
                title: "Bon Retour",
                subtitle: "Veuillez vous connecter à votre compte pour continuer",
                registrationSuccess: "Inscription réussie ! Veuillez vous connecter avec vos identifiants.",
                form: {
                    email: {
                        label: "Adresse Email"
                    },
                    password: {
                        label: "Mot de Passe",
                        toggleVisibility: "Basculer la visibilité du mot de passe"
                    },
                    rememberMe: "Se souvenir de moi",
                    forgotPassword: "Mot de passe oublié ?",
                    submitButton: "Se Connecter",
                    noAccount: "Vous n'avez pas de compte ?",
                    signUpLink: "S'inscrire"
                },
                socialLogin: {
                    divider: "OU CONTINUER AVEC"
                },
                success: {
                    title: "Connexion Réussie !",
                    message: "Vous avez été connecté avec succès à votre compte.",
                    goToDashboard: "Aller au Tableau de Bord"
                }
            },
            validation: {
                email: {
                    required: "L'email est requis",
                    invalid: "Veuillez entrer une adresse email valide"
                },
                password: {
                    required: "Le mot de passe est requis",
                    minLength: "Le mot de passe doit contenir au moins 6 caractères"
                }
            },
            errors: {
                loginFailed: "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.",
                invalidCredentials: "Email ou mot de passe invalide. Veuillez réessayer."
            },

            auth: {
                signup: {
                    title: "Créer votre compte",
                    subtitle: "Remplissez le formulaire ci-dessous pour commencer",
                    button: "Créer un compte",
                    hasAccount: "Vous avez déjà un compte?",
                    signInLink: "Se connecter",
                    success: {
                        title: "Inscription réussie!",
                        message: "Votre compte a été créé avec succès. Veuillez vérifier votre email pour activer votre compte.",
                        loginButton: "Aller à la connexion"
                    }
                },
                fields: {
                    fullName: "Nom complet",
                    email: "Adresse e-mail",
                    password: "Mot de passe",
                    confirmPassword: "Confirmer le mot de passe"
                },
                password: {
                    strengthLabel: "Force du mot de passe",
                    strength: {
                        veryWeak: "Très faible",
                        weak: "Faible",
                        medium: "Moyen",
                        strong: "Fort",
                        veryStrong: "Très fort"
                    }
                },
                errors: {
                    nameRequired: "Le nom est requis",
                    emailRequired: "L'email est requis",
                    emailInvalid: "Veuillez entrer une adresse email valide",
                    passwordRequired: "Le mot de passe est requis",
                    passwordMinLength: "Le mot de passe doit contenir au moins 8 caractères",
                    passwordWeak: "Le mot de passe est trop faible",
                    confirmPasswordRequired: "Veuillez confirmer votre mot de passe",
                    passwordMismatch: "Les mots de passe ne correspondent pas",
                    termsRequired: "Vous devez accepter les conditions d'utilisation"
                },
                agreeToTerms: {
                    text: "J'accepte les",
                    terms: "Conditions d'utilisation",
                    and: "et la",
                    privacy: "Politique de confidentialité"
                },
                orContinueWith: "OU CONTINUER AVEC",
                togglePassword: "basculer la visibilité du mot de passe"
            },


            // Status indicators
            status: {
                operational: "Tous systèmes opérationnels",
                maintenance: "Maintenance en cours",
                incident: "Incident de service"
            },

            // Compute Resources
            compute: {
                virtualMachines: "Machines Virtuelles",
                containers: "Conteneurs",
                serverless: "Serverless",
                vCPU: "Cœurs vCPU",
                memory: "Mémoire",
                storage: "Stockage"
            },

            // Storage Types
            storageTypes: {
                block: "Stockage en bloc",
                object: "Stockage objet",
                file: "Stockage fichier"
            },

            // Networking
            networking: {
                loadBalancers: "Répartiteurs de charge",
                dns: "DNS",
                firewall: "Pare-feu",
                vpn: "VPN"
            }
            ,
            // General Terms
            back: 'Retour',
            next: 'Suivant',
            cancel: 'Annuler',
            submit: 'Soumettre',
            requiredField: 'Ce champ est obligatoire',
            loading: 'Chargement...',

            // Page Titles
            findSuitableHost: 'Trouver un Hôte Adapté',
            findSuitableHostDescription: 'Cet outil vous aidera à trouver le meilleur cluster pour votre machine virtuelle en fonction des exigences de ressources.',

            // Steps
            specifyRequirements: 'Spécifier les Exigences',
            reviewSelection: 'Vérifier la Sélection',
            vmCreation: 'Création de VM',

            // Step Descriptions
            specifyRequirementsDesc: 'Définissez les exigences en CPU, mémoire et stockage pour votre machine virtuelle.',
            reviewSelectionDesc: 'Vérifiez l\'hôte sélectionné avant de procéder à la création de la VM.',
            vmCreationDesc: 'Création de la machine virtuelle en cours.',

            // Resource Form
            vmName: 'Nom de la VM',
            vmNameHelper: 'Entrez un nom pour votre machine virtuelle',
            cpuCores: 'Cœurs CPU',
            cpuCoresHelper: 'Nombre de cœurs CPU virtuels requis',
            memory: 'Mémoire',
            memoryHelper: 'Allocation de mémoire en MiB (1024 MiB = 1 Go)',
            storage: 'Stockage',
            storageHelper: 'Espace disque alloué en Go',
            osType: 'Système d\'Exploitation',
            osTypeHelper: 'Sélectionnez le système d\'exploitation pour votre VM',
            rootPassword: 'Mot de Passe Root',
            rootPasswordHelper: 'Définir le mot de passe root/administrateur',

            // Host Selection
            selectedHost: 'Hôte Sélectionné',
            hostCluster: 'Cluster Hôte',
            hostResources: 'Ressources de l\'Hôte',
            availableCpu: 'CPU Disponible',
            availableMemory: 'Mémoire Disponible',
            availableStorage: 'Stockage Disponible',

            // Status Messages
            searchingHost: 'Recherche d\'un hôte adapté...',
            hostFound: 'Hôte adapté trouvé !',
            noHostFound: 'Aucun hôte adapté trouvé. Veuillez ajuster vos exigences.',
            creatingVm: 'Création de la machine virtuelle...',
            vmCreatedSuccess: 'Machine virtuelle créée avec succès !',
            vmCreateError: 'Échec de la création de la machine virtuelle',

            // Actions
            findHost: 'Trouver un Hôte',
            createVm: 'Créer la VM',
            createAnother: 'Créer une Autre VM',
            viewDetails: 'Voir les Détails',

            // Results
            vmDetails: 'Détails de la VM',
            vmName: 'Nom',
            vmStatus: 'Statut',
            vmHost: 'Hôte',
            vmIp: 'Adresse IP',
            vmCreatedAt: 'Créé Le',
            // VM Offer Types
            vmOfferMicro: "Micro",
            vmOfferSmall: "Petit",
            vmOfferMedium: "Moyen",
            vmOfferLarge: "Grand",
            vmOfferCustom: "Personnalisé",

            // Status Messages
            vmStatusRunning: "En cours d'exécution",
            vmStatusStopped: "Arrêté",
            vmStatusError: "Erreur",
            vmStatusCreating: "Création en cours",

            // Resource Units
            unitCpuCores: "cœurs CPU",
            unitMemoryGB: "Go RAM",
            unitStorageGB: "Go stockage",

            // OS Types
            osTypeLinux: "Linux",
            osTypeWindows: "Windows",

            // Validation Messages
            validationRequired: "Ce champ est obligatoire",
            validationMinCpu: "Minimum 1 cœur CPU requis",
            validationMinMemory: "Minimum 512 Mio de mémoire requis",
            validationMinStorage: "Minimum 10 Go de stockage requis",
            validationPasswordLength: "Le mot de passe doit contenir au moins 8 caractères",

            cluster: {
                management: "Gestion des Clusters",
                addCluster: "Ajouter un Cluster",
                editCluster: "Modifier le Cluster",
                confirmDelete: "Êtes-vous sûr de vouloir supprimer ce cluster ?",
                noClusters: "Aucun cluster trouvé. Cliquez sur 'Ajouter un Cluster' pour en créer un.",
                status: "Statut",
                name: "Nom",
                ipAddress: "Adresse IP",
                macAddress: "Adresse MAC",
                storage: "Stockage",
                memory: "Mémoire",
                cpu: "CPU",
                processor: "Processeur",
                totalStorage: "Stockage Total (GB)",
                availableStorage: "Stockage Disponible (GB)",
                totalRAM: "RAM Totale (GB)",
                availableRAM: "RAM Disponible (GB)",
                cpuCores: "Cœurs CPU",
                availableCores: "Cœurs Disponibles",
                cores: "cœurs",
                statuses: {
                    healthy: "Sain",
                    warning: "Avertissement",
                    critical: "Critique"
                },
                healthDataUnavailable: "Données de santé indisponibles",
                systemHealth: "Santé du Système",
                service: "Service",
                message: "Message",
                noMessage: "Aucun message disponible",
                systemInfoUnavailable: "Informations système indisponibles",
                systemInformation: "Informations Système",
                version: "Version",
                uptime: "Temps de Fonctionnement",
                clusters: "Clusters",
                active: "actif",
                total: "total",
                virtualMachines: "Machines Virtuelles",
                running: "en cours d'exécution",
                storageUsage: "Utilisation du Stockage",
                memoryUsage: "Utilisation de la Mémoire",
                cpuUsage: "Utilisation du CPU",
                usedOf: "utilisé sur",
                coresUsedOf: "cœurs utilisés sur",
                noAvailableClusters: "Aucun cluster disponible trouvé",
                availableClusters: "Clusters Disponibles",
                clustersAvailable: "clusters disponibles",
                clusterName: "Nom du Cluster",
                cpuAvailable: "CPU Disponible",
                ramAvailable: "RAM Disponible",
                storageAvailable: "Stockage Disponible",
                clusterDetails: "Détails du Cluster",
                generalInformation: "Informations Générales",
                clusterId: "ID du Cluster",
                resourceAllocation: "Allocation des Ressources",
                memoryRAM: "Mémoire (RAM)",
                managementDashboard: "Tableau de Bord de Gestion des Clusters"
            },
            common: {
                home: "Accueil",
                refresh: "Actualiser",
                cancel: "Annuler",
                update: "Mettre à jour",
                create: "Créer",
                actions: "Actions",
                search: "Rechercher",
                clear: "Effacer",
                edit: "Modifier",
                delete: "Supprimer",
                viewDetails: "Voir les Détails",
                close: "Fermer",
                refreshing: "Actualisation en cours...",
                refreshData: "Actualiser les Données",
                lastUpdated: "Dernière mise à jour"
            },
            systemImages: {
                title: "Images Système",
                addImage: "Ajouter une Image",
                searchPlaceholder: "Rechercher des images système...",
                allImages: "Toutes les Images",
                linux: "Linux",
                windows: "Windows",
                otherOS: "Autres OS",
                loading: "Chargement des images système...",
                noImagesFound: "Aucune image système trouvée",
                confirmDelete: "Êtes-vous sûr de vouloir supprimer l'image système \"{name}\" ?",
                addTitle: "Ajouter une Nouvelle Image Système",
                editTitle: "Modifier l'Image Système",
                viewTitle: "Détails de l'Image Système",
                version: "Version",
                noDescription: "Aucune description disponible",
                osType: "Type d'OS",
                description: "Description",
                created: "Créé",
                lastUpdated: "Dernière Mise à Jour",
                nameLabel: "Nom de l'Image",
                osTypeLabel: "Type d'OS",
                versionLabel: "Version",
                versionPlaceholder: "ex. 22.04 LTS",
                descriptionLabel: "Description",
                descriptionPlaceholder: "Fournir une description détaillée de l'image système",
                imagePreview: "Aperçu de l'Image Système",
                imageAlt: "Aperçu de l'Image Système",
                noImageAvailable: "Aucune image disponible",
                uploadImage: "Télécharger une Image"
            },
            clusterManagement: {
                title: "Gestion des Clusters",
                subtitle: "Créez, configurez et gérez vos instances de cluster",
                totalClusters: "Clusters Totaux: {count}",
                activeClusters: "Clusters Actifs",
                activeDescription: "Clusters sains et opérationnels",
                warningState: "État d'Avertissement",
                warningDescription: "Clusters avec avertissements",
                errorState: "État d'Erreur",
                errorDescription: "Clusters nécessitant une attention",
                tabsAriaLabel: "Onglets de gestion des clusters",
                tabDashboard: "Tableau de Bord",
                tabManageClusters: "Gérer les Clusters",
                tabFindHost: "Trouver un Hôte",
                tabSystemImages: "Images Système",
                helpTitle: "Besoin d'Aide ?",
                helpText: "Apprenez-en plus sur la gestion des clusters dans notre <1>documentation</1> ou <3>contactez le support</3> si vous rencontrez des problèmes."
            },
            profile: {
                title: "Profil Utilisateur",
                tabs: {
                    profile: "Profil",
                    edit: "Modifier Profil",
                    password: "Changer Mot de Passe"
                },
                fields: {
                    name: "Nom",
                    email: "Email",
                    currentPassword: "Mot de Passe Actuel",
                    newPassword: "Nouveau Mot de Passe"
                },
                buttons: {
                    update: "Mettre à Jour",
                    changePassword: "Changer Mot de Passe",
                    delete: "Supprimer Profil"
                },
                messages: {
                    updateSuccess: "Profil mis à jour avec succès!",
                    passwordChangeSuccess: "Mot de passe changé avec succès!",
                    deleteConfirm: "Êtes-vous sûr de vouloir supprimer votre profil? Cette action est irréversible.",
                    deleteSuccess: "Profil supprimé avec succès!"
                }
            },
            resetPassword: {
                title: "Réinitialiser Mot de Passe",
                steps: {
                    email: "Entrez votre email pour recevoir un code de réinitialisation",
                    code: "Vérifiez votre email pour le code et entrez-le ci-dessous",
                    password: "Entrez votre nouveau mot de passe pour compléter la réinitialisation"
                },
                buttons: {
                    sendCode: "Envoyer Code",
                    verifyCode: "Vérifier Code",
                    resetPassword: "Réinitialiser Mot de Passe",
                    resendCode: "Renvoyer Code"
                },
                messages: {
                    codeSent: "Code de réinitialisation envoyé à votre email",
                    codeVerified: "Code vérifié avec succès",
                    passwordReset: "Mot de passe réinitialisé avec succès"
                }
            },
            common: {
                errors: {
                    required: "Ce champ est requis",
                    emailInvalid: "Veuillez entrer une adresse email valide",
                    passwordMismatch: "Les mots de passe ne correspondent pas"
                }
            },

            userManagement: {
                title: "Gestion des Utilisateurs",
                buttons: {
                    refresh: "Actualiser",
                    createUser: "Créer Utilisateur",
                    edit: "Modifier",
                    delete: "Supprimer",
                    resetPassword: "Réinitialiser Mot de Passe",
                    viewDetails: "Voir Détails",
                    saveChanges: "Enregistrer",
                    cancel: "Annuler",
                    clearFilters: "Effacer Filtres"
                },
                filters: {
                    title: "Filtres",
                    role: {
                        all: "Tous les Rôles",
                        admin: "Administrateur",
                        user: "Utilisateur"
                    },
                    status: {
                        all: "Tous les Statuts",
                        active: "Actif",
                        inactive: "Inactif"
                    }
                },
                table: {
                    headers: {
                        name: "Nom",
                        email: "Email",
                        role: "Rôle",
                        status: "Statut",
                        actions: "Actions"
                    },
                    noUsers: "Aucun utilisateur trouvé"
                },
                dialogs: {
                    createUser: {
                        title: "Créer un Nouvel Utilisateur",
                        userType: "Type d'Utilisateur",
                        regularUser: "Utilisateur Standard",
                        administrator: "Administrateur",
                        adminDescription: "Les administrateurs ont un accès complet pour gérer toutes les ressources système et autres utilisateurs.",
                        userDescription: "Les utilisateurs standards ont des permissions limitées basées sur leurs ressources assignées.",
                        accountStatus: "Statut du Compte",
                        statusHelper: "Les utilisateurs actifs peuvent se connecter immédiatement au système"
                    },
                    editUser: {
                        title: "Modifier Utilisateur"
                    },
                    resetPassword: {
                        title: "Réinitialiser Mot de Passe",
                        description: "Entrez un nouveau mot de passe pour {name}"
                    },
                    deleteUser: {
                        title: "Confirmer la Suppression",
                        description: "Êtes-vous sûr de vouloir supprimer l'utilisateur {name}?",
                        warning: "Cette action est irréversible. L'utilisateur sera définitivement supprimé du système."
                    },
                    viewUser: {
                        title: "Détails de l'Utilisateur",
                        userId: "ID Utilisateur",
                        createdAt: "Créé Le",
                        lastUpdated: "Dernière Mise à Jour",
                        close: "Fermer"
                    }
                },
                messages: {
                    userCreated: "Utilisateur créé avec succès!",
                    userUpdated: "Utilisateur mis à jour avec succès!",
                    passwordReset: "Mot de passe réinitialisé avec succès!",
                    userDeleted: "Utilisateur supprimé avec succès!",
                    error: {
                        fetchUsers: "Échec de la récupération des utilisateurs. Veuillez réessayer.",
                        createUser: "Échec de la création de l'utilisateur. Veuillez réessayer.",
                        updateUser: "Échec de la mise à jour de l'utilisateur. Veuillez réessayer.",
                        resetPassword: "Échec de la réinitialisation du mot de passe. Veuillez réessayer.",
                        deleteUser: "Échec de la suppression de l'utilisateur. Veuillez réessayer."
                    }
                }
            },




            // Add this to the fr.translation object
            footer: {
                tagline: "Infrastructure Cloud en tant que Service",
                newsletter: "Newsletter",
                emailPlaceholder: "Votre adresse email",
                followUs: "Suivez-nous",
                products: "Produits",
                virtualMachines: "Machines Virtuelles",
                kubernetes: "Kubernetes",
                storage: "Stockage",
                loadBalancers: "Répartiteurs de charge",
                backups: "Sauvegardes",
                resources: "Ressources",
                documentation: "Documentation",
                apiReference: "Référence API",
                tutorials: "Tutoriels",
                community: "Communauté",
                status: "Statut",
                company: "Entreprise",
                aboutUs: "À propos",
                careers: "Carrières",
                contact: "Contact",
                blog: "Blog",
                press: "Presse",
                legal: "Légal",
                termsOfService: "Conditions d'utilisation",
                privacyPolicy: "Politique de confidentialité",
                security: "Sécurité",
                compliance: "Conformité",
                gdpr: "RGPD",
                copyright: `© ${year} Iaas-Firecracker. Tous droits réservés.`,
                subscribe: "S'abonner",
                cookiePolicy: "Politique de cookies"
            }


        }
    },
    // Add other languages as needed (es, de, zh, etc.)
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;