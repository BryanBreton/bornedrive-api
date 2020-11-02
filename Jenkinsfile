#!groovy
@Library('gie') _

continuousDeployment(
  builder: 'npm',
  deployer: 'node_mutualise',
  slackChannel: '{{id-project}}-stream',
  authProvider: 'none',
  skipIntegrationTests: true,
  allowManualDeployment: true,
  forceEligibilityForRelease: true,
  nodeMutualiseDeployer: [
    int1: [
// Environnement d'intégration node mutualisé:
//      host    : 'u3antu201',
//      nodeEnv : 'ENV01',
//      instance: '<nom de l\'instance>', // Nom de l'instance à demander à votre gestionnaire d'intégration
//      port    : '<port>', // Port à demander à votre gestionnaire d'intégration
//      confenv : 'confenv-forgerock.sh', // (fichier confenv-forgerock.sh déjà existant dans le SVN sous http://svn.groupement.systeme-u.fr/svn/Referentiel_GIE_CONFAPP/INT/default/confenv-forgerock.sh)
//      confapp : 'confapp.sh', // (fichier confapp.sh à créer dans le SVN sous http://svn.groupement.systeme-u.fr/svn/Referentiel_GIE_CONFAPP/INT/{PROJECT_NAME}/confapp.sh)
    ],
    rec1: [
// Environnement de recette node mutualisé:
//      host    : 'u3recu539',
//      nodeEnv : 'ENV01',
//      instance: '<nom de l\'instance>', // Nom de l'instance à demander à votre gestionnaire d'intégration
//      port    : '<port>', // Port à demander à votre gestionnaire d'intégration
//      confenv : 'confenv-forgerock.sh', // (fichier confenv-forgerock.sh déjà existant dans le SVN sous http://svn.groupement.systeme-u.fr/svn/Referentiel_GIE_CONFAPP/REC/default/confenv-forgerock.sh)
//      confapp : 'confapp.sh', // (fichier confapp.sh à créer dans le SVN sous http://svn.groupement.systeme-u.fr/svn/Referentiel_GIE_CONFAPP/REC/{PROJECT_NAME}/confapp.sh)
    ],
    prod: [
// Environnement de production node mutualisé (environnement durçi)
//      host       : 'u3antu771',
//      nodeEnv    : 'ENV01',
//      instance: '<nom de l\'instance>', // Nom de l'instance à demander à votre gestionnaire d'intégration
//      port    : '<port>', // Port à demander à votre gestionnaire d'intégration
//      confenv    : 'confenv-forgerock.sh', // (fichier confenv-forgerock.sh déjà existant dans le SVN sous http://svn.groupement.systeme-u.fr/svn/Referentiel_GIE_CONFAPP/PRD/default/confenv-forgerock.sh)
//      confapp    : 'confapp.sh', // (fichier confapp.sh à créer dans le SVN sous http://svn.groupement.systeme-u.fr/svn/Referentiel_GIE_CONFAPP/PRD/{PROJECT_NAME}/confapp.sh)
//      secured    : 'true', // configuration serveur durçi
//      sshUser    : 'svc_node', // configuration serveur durçi
//      sshCredentials : 'ssh-svc_node-prod' // configuration serveur durçi
    ]
  ],
  smokeTestRunner: [
    int1: [
//      testRunner: 'jsonapihealth',
//      startDelay: 10,
//      parameters : [
//        apiUrlRoot: 'http://u3antu201.groupement.systeme-u.fr:<port>/{{id-project-extend}}-v1/actuator/health'
//      ]
    ],
    rec1: [
//      testRunner: 'jsonapihealth',
//      startDelay: 10,
//      parameters : [
//        apiUrlRoot: 'http://u3recu539.groupement.systeme-u.fr:<port>/{{id-project-extend}}-v1/actuator/health'
//      ]
    ],
    prod: [
//      testRunner: 'jsonapihealth',
//      startDelay: 10,
//      parameters : [
//        apiUrlRoot: 'http://u3antu771.groupement.systeme-u.fr:<port>/{{id-project-extend}}-v1/actuator/health'
//      ]
    ]
  ]
)
