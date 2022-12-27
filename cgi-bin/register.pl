#!C:/xampp/perl/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

my $user = 'alumno';
my $password = 'pweb1';
my $dsn = "DBI:mysql:database=pweb1;host=192.168.0.16";
my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

my $sent = $dbh->prepare("INSERT INTO empleados(dni,firstName,lastName,salario) VALUES (?,?,?,?)");

my $q = CGI->new();

my $dni = $q->param('dni');
my $firstN = $q->param('firstN');
my $lastN = $q->param('lastN');
my $salary = $q->param('salary');

print $q->header('text/XML');

if($sent->execute($dni,$firstN,$lastN,$salary)) {
    print "OK";
}else {
    print "NO";
}