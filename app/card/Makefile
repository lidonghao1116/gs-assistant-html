util: myutil.cxx
	rm -f *.o
	rm -f *.dylib
	rm -f *.so
	g++ -c -fPIC -o myutil.o myutil.cxx
	g++ -shared -o libmyutil.dylib myutil.o