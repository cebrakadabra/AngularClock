Aufgabenstellung 
=================

[100%] create Readme.md und info.md and commit it to folder uebung2

[100%] es gibt zwei Views, die Uhrzeit-View und die Stoppuhr-View

[100%] es wird immer entweder die Uhrzeit-View oder die Stoppuhr-View angezeigt werden. Anhand der URL und anhand von Buttons kann zu der jeweiligen View navigiert werden. Für den Viewwechsel sollt ihr das AngularJS-Module ng-route verwenden.

[100%] die Businesslogik wird anhand eines oder mehrerer Services bereitgestellt (die Businesslogik für die Uhrzeit und die Stoppuhr können getrennte Services sein). Es ist zu überlegen, was die Schnittstelle des Services ist und was alles nach „außen“ sichtbar sein soll. Private Eigenschaften und Funktionen sollen als solche gekennzeichnet werden (Underscore).

[100%] das Model und der Controller sind soweit abzuändern, sodass ihr die Features von AngularJS optimal nützen könnt (vor allem Data Binding). Der Controller darf keine View-Manipulation enthalten.

[100%] die View ist ebenfalls so zu ändern/umzusetzen, sodass ihr die Features von AngularJS optimal nützen könnt (Aktivstatus bei Button über ng-class setzen, ng-repeat für Liste...)

[100%] Wiederverwendbare Komponenten (Directiven) und projektspezifische Komponenten sind zu ermitteln

[100%] Die wiederverwendbaren Komponenten sollen eine Schnittstelle und einen in sich abgeschlossenen Bereich erhalten (Directive - eigener scope). Die projektspezifischen Komponenten können den scope des übergeordneten Elements erben oder verwenden diesen direkt

[100%] Die digitale Darstellung der Uhrzeit sowie die analoge Darstellung der Uhrzeit soll als wiederverwendbare Komponente (Directiven) umgesetzt werden. Die digitale Darstellung der Uhrzeit soll in der Stoppuhr-View sowie in der Uhrzeit-View verwendet werden.

[100%] die Übung ist ausführlich zu kommentieren (Module, Schnittstellen, Funktionen, Services, Direktiven...)

[100%] Die Übung soll refactored werden: Struktur verbessern, klare und selbsterklärende Bezeichnung von Code (Variablen, Funktionen...), keine Codeduplizierungen, Code formatieren (automatisch),...

Uhrzeit View:
--------------

[100%] die Uhrzeit-View zeigt die aktuelle Uhrzeit an. Die Darstellung kann zwischen analoger und digitaler Darstellung gewechselt werden, weiters kann der Timezone-Offset verändern werden (mittels +/- Buttons, Defaultwert 0). Der aktuelle Timezone-Offset wird ausgegeben.

Stoppuhr View:
--------------

 [100%] die Stoppuhr-View ermöglicht es Zeiten zu stoppen. Die Zeit wird in digitaler Form dargestellt (Millisekunden). Die gestoppte Zeit kann gespeichert werden und wird in einer Liste dargestellt. Der User kann zu jeder Zeit zusätzliche Information speichern, weiters erhält jede Zeit eine fortlaufende Nummer. Die Liste der gestoppten Zeiten soll in der Stoppuhr-View immer angezeigt werden und kann nach Zeit, Information oder der fortlaufenden Nummer auf- und absteigend sortiert werden. Es können die gespeicherten Zeiten gelöscht werden (einzeln sowie die gesamte Liste).




 Kür:
--------------

 [0%] der Wechsel zwischen den Views wird anhand CSS animiert (Wechsel zwischen Uhrzeit-View und Stoppuhr-View). Der Animationseffekt kann z.B. ein Crossfade sein. Dazu das AngularJS-Module ng-animate verwenden.

 [100%] Persistance: die Liste der Zeiten wird im Local Storage gespeichert. Zu Beginn wird die Liste ausgelesen und im Service als Initialwert gesetzt.


