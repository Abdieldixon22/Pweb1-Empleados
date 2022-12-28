#!C:/xampp/perl/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI->new();

my $user = 'alumno';
my $password = 'pweb1';
my $dsn = "DBI:mysql:database=pweb1;host=192.168.0.19";
my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

my $sent = $dbh->prepare("SELECT idEmp, firstName, lastName, dni, salario FROM empleados");

$sent->execute();

print $q->header('text/XML');

my $xml =   "<?xml version='1.0' encoding='UTF-8'?>\n".
            "   <employees>\n";

while(my @row = $sent->fetchrow_array) {
    $xml = $xml . "<status>OK</status>\n".
                  "<employee>\n".
                  "     <idEmp>$row[0]</idEmp>\n".
                  "     <firstName>$row[1]</firstName>\n".
                  "     <lastName>$row[2]</lastName>\n".
                  "     <dni>$row[3]</dni>\n".
                  "     <salary>$row[4]</salary>\n".
                  "</employee>\n";
}

$xml = $xml."   </employees>";

$sent->finish;
$dbh->disconnect;

print $xml;