"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const database_dto_1 = require("./dto/database.dto");
let DatabaseController = class DatabaseController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    init() {
        return this.databaseService.init();
    }
    setCapacity(dto) {
        return this.databaseService.setCapacity(dto.capacity);
    }
    getState() {
        return this.databaseService.getState();
    }
    resetDatabase(id) {
        return this.databaseService.resetDatabase(id);
    }
};
exports.DatabaseController = DatabaseController;
__decorate([
    (0, common_1.Post)('/init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "init", null);
__decorate([
    (0, common_1.Post)('/set-capacity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [database_dto_1.DatabaseDto]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "setCapacity", null);
__decorate([
    (0, common_1.Get)('/state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "getState", null);
__decorate([
    (0, common_1.Patch)(':id/reset'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DatabaseController.prototype, "resetDatabase", null);
exports.DatabaseController = DatabaseController = __decorate([
    (0, common_1.Controller)('/api/database'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
//# sourceMappingURL=database.controller.js.map