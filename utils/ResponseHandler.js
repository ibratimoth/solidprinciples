class ResponseHandler {
    static success(res, data, status = 200) {
        return res.status(status).json({ success: true, data });
    }
    static noUser(res, message, status = 200) {
        return res.status(status).json({ success: true, message });
    }

    static error(res, message, status = 500) {
        return res.status(status).json({ success: false, message });
    }

    static notFound(res, message) {
        return res.status(404).json({ success: false, message });
    }

    static fieldVal(res, message) {
        return res.status(400).json({ success: false, message });
    }
}

module.exports = ResponseHandler;