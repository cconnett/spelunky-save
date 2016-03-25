var app = angular.module('JournalEditor', [])
              .decorator('$window', function($delegate) {
                Object.defineProperty($delegate, 'history', {get: () => null});
                return $delegate;
              });
