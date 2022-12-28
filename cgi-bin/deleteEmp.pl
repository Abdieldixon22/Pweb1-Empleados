#!C:/xampp/perl/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

my $user = 'alumno';
my $password = 'pweb1';
my $dsn = "DBI:mysql:database=pweb1;host=192.168.0.19";
my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

my $q = CGI->new();

my $id = $q->param('idEmp');

my $sent = $dbh->prepare("DELETE FROM empleados WHERE idEmp=?");

print $q->header('text/XML');

if($sent->execute($id)) {
    print "OK";
}else {
    print "NO";
}

$sent->finish;
$dbh->disconnect;