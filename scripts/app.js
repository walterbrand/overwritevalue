angular
    .module('app', [])
    .directive('content', function($compile, $controller, $injector){
        return {
            restrict : 'E',
            link : function(scope, elem){
                var newScope = scope.$new(),
                    newContent = $compile('<div>{{data.name}}</div>')(newScope);
                
                var logCollector = $injector.get('myfeature.logCollector')
                logCollector.logger = {
                        warn : function(message){console.log('Overwritten: ' + message)}
                }
                
                $controller('myfeature.mainController',{$scope: newScope});
                
                elem.append(newContent);
                
            }
        }
    })
    .controller('myfeature.mainController', ['$scope', 'myfeature.logCollector', function($scope, logCollector){
        $scope.data = {
            name: 'hi'
        }
        logCollector.logger.warn('Hi there')
    }])
    .value('myfeature.logCollector', {
        logger : {
            warn : function(message){console.log('I am the old implementation, saying: ' + message)}
        }
    })