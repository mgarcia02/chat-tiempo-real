const ChatWindow = () => {
    return (
        <div className="flex flex-col h-full">
            <header className="flex justify-between p-5 bg-slate-400">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-slate-600"></div>
                    <h3>Chat 1</h3>
                </div>
                <div className="flex gap-2">
                    <button>Buscar</button>
                    <button>Config</button>
                </div>
            </header>
            
            <section className="flex-1 h-screen p-5 overflow-y-auto">
                <ul className="space-y-5">
                    <li className="flex justify-start">
                        <div className="max-w-md p-2 bg-white rounded shadow">
                            Hola Mario!
                        </div>
                    </li>

                    <li className="flex justify-end">
                        <div className="max-w-md p-2 bg-blue-200 rounded">
                            Qué tal?
                        </div>
                    </li>

                    <li className="flex justify-start">
                        <div className="max-w-md p-2 bg-white rounded shadow">
                            Todo bien! y tu? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit voluptatibus voluptatem minima, unde, ab modi eum possimus asperiores laborum tempora impedit, rem numquam doloremque incidunt nemo iure quis fuga dolore.
                        </div>
                    </li>
                    <li className="flex justify-end">
                        <div className="max-w-md p-2 bg-blue-200 rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum amet itaque explicabo dolores, dolorem doloremque, repellendus error, sunt a incidunt nulla voluptatibus distinctio debitis ratione adipisci provident eum mollitia voluptate!
                        </div>
                    </li>
                    <li className="flex justify-start">
                        <div className="max-w-md p-2 bg-white rounded shadow">
                            Todo bien! y tu? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit voluptatibus voluptatem minima, unde, ab modi eum possimus asperiores laborum tempora impedit, rem numquam doloremque incidunt nemo iure quis fuga dolore.
                        </div>
                    </li>
                    <li className="flex justify-end">
                        <div className="max-w-md p-2 bg-blue-200 rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum amet itaque explicabo dolores, dolorem doloremque, repellendus error, sunt a incidunt nulla voluptatibus distinctio debitis ratione adipisci provident eum mollitia voluptate!
                        </div>
                    </li>
                    <li className="flex justify-end">
                        <div className="max-w-md p-2 bg-blue-200 rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum amet itaque explicabo dolores, dolorem doloremque, repellendus error, sunt a incidunt nulla voluptatibus distinctio debitis ratione adipisci provident eum mollitia voluptate!
                        </div>
                    </li>
                </ul>
            </section>

            <footer className="flex gap-5 p-3 bg-slate-300">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="w-full p-2 border rounded-full border-slate-400"
                />
                <button>Enviar</button>
            </footer>
        </div>
    )
}

export default ChatWindow