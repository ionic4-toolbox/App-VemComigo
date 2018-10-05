# VemComigo

## Visão geral
Aplicativo para integração de mulheres.

## Iniciando a aplicação
```
ng serve
```
**Criando versão de produção**
```
ng build --prod
```
**Rodando Testes**
```
ng test
```

## Rodando no celular diretamente
** Habilitar depuração de celular**

Para testar diretamente no celular você precisa habilitar a depuração usb no seu celular. Então siga o tutorial abaixo para fazer isso:

[Habilitando depuração USB no celular android](https://www.androidpit.com.br/como-ativar-depuracao-usb-android)

Apos habilitar a depuração usb é hora de conectar o cabo usb no celular e plugar no pc/notebook. Feito isso rodar os comandos abaixo:

O comando baixo gera a plataforma android para o aplicativo no projeto ionic (executar apenas uma vez):

```sh
ionic platform add android
```
O comando abaixo gera um release que pode ser executada diretamente no celular

```sh
ionic cordova run android --device
```
Se tudo estiver ok. Então o apk será instalado no celular e você podera verificar o aplicativo rodando diretamente no celular.

