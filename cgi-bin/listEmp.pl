#!C:/xampp/perl/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

my $user = 'alumno';
my $password = 'pweb1';
my $dsn = "DBI:mysql:database=pweb1;host=192.168.0.16";
my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

my $sent = $dbh->prepare("SELECT * FROM empleados");

$sent->execute();


