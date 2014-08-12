
var helper = require('./specHelper.js');
var child_process = require('child_process');

describe( 'child_process', function() {

  beforeEach(function() {
    helper.testComplete(false);
  });

  it('should be able to async spawn', function() {
    waitsFor(helper.testComplete, "child process to read", 5000 );
    var content = '';
    var proc = child_process.spawn('/bin/cat', [ 'pom.xml' ]);
    proc.stdout.on('data', function(d) {
      content += d.toString();
    })
    proc.on('close', function() {
      expect( content.indexOf( '<project xmlns' ) ).toBeGreaterThan(0);
      expect( content.indexOf( '</project>' ) ).toBeGreaterThan(0);
      helper.testComplete(true);
    })
  });

  it('should be able to kill a spawned process', function() {
    waitsFor(helper.testComplete, "child process to be killed", 5000 );
    var proc = child_process.spawn( '/bin/cat' );
    proc.on( 'close', function(code,signal) {
      expect( signal ).toBe( 15 );
      helper.testComplete(true);
    });
    proc.kill();
  })

  it('should be able to sync spawn', function() {
    var result = child_process.spawnSync('cat', [ 'pom.xml' ]);
    expect( result ).not.toBe( undefined );
    expect( result.pid ).not.toBe( undefined );
    expect( result.pid ).toBeGreaterThan( 0 );
    expect( result.status ).toBe( 0 );
    expect( result.stdout.toString().indexOf( '<project xmlns' ) ).toBeGreaterThan( 0 );
    expect( result.stdout.toString().indexOf( '</project>' ) ).toBeGreaterThan( 0 );
    expect( result.stdout.toString() ).toBe( result.output[1].toString() );
  });

  it( 'should be able to exec', function() {
    waitsFor(helper.testComplete, "child process to be exec'd", 5000 );
    child_process.exec( 'cat pom.xml | wc -l', function(err, stdout, stderr) {
      expect( stdout ).toBeGreaterThan( 300 );
      expect( stdout ).toBeLessThan( 500 );
      helper.testComplete(true);
    } );
  });

  xit( 'should be able to fork', function() {
    waitsFor(helper.testComplete, "child process to be killed", 10000 );
    console.log( "about to fork" );
    var child = child_process.fork( './src/test/javascript/forked_module.js' );
    console.log( "did fork" );
    child.on( "exit", function() {
      console.log( 'child exited' );
      console.log( 'child exited' );
      console.log( 'child exited' );
      console.log( 'child exited' );
      console.log( 'child exited' );
      helper.testComplete( true );
    })
    setTimeout( function() {
      console.log( "sending message to child" );
      child.send( { cheese: 'cheddar' } );
    }, 4000 );
  });

});